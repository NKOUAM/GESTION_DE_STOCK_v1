package anapicoli.estoque.config;

import anapicoli.estoque.security.CustomUserDetailsService;
import anapicoli.estoque.security.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtFilter;
    private final CustomUserDetailsService userDetailsService;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public DaoAuthenticationProvider authProvider() {
        DaoAuthenticationProvider p = new DaoAuthenticationProvider();
        p.setUserDetailsService(userDetailsService);
        p.setPasswordEncoder(passwordEncoder());
        return p;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration cfg) throws Exception {
        return cfg.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(AbstractHttpConfigurer::disable)
            .cors(c -> c.configurationSource(corsSource()))
            .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                // ==========================================================
                // PUBLIC : authentification (login, register, mot de passe oublié)
                // ==========================================================
                .requestMatchers(
                    "/api/auth/login",
                    "/api/auth/register",
                    "/api/auth/forgot-password",
                    "/api/auth/reset-password"
                ).permitAll()

                // ==========================================================
                // AUTHENTIFIÉ : changement de mot de passe (nécessite JWT)
                // ==========================================================
                .requestMatchers("/api/auth/change-password").authenticated()

                // ==========================================================
                // LECTURE : tout utilisateur connecté
                // ==========================================================
                .requestMatchers(HttpMethod.GET, "/api/**").authenticated()

                // ==========================================================
                // CATÉGORIES
                // ==========================================================
                .requestMatchers(HttpMethod.POST, "/api/categorias/**").hasAnyRole("ADMIN", "GERANT")
                .requestMatchers(HttpMethod.PUT, "/api/categorias/**").hasAnyRole("ADMIN", "GERANT")
                .requestMatchers(HttpMethod.DELETE, "/api/categorias/**").hasRole("ADMIN")

                // ==========================================================
                // FOURNISSEURS
                // ==========================================================
                .requestMatchers(HttpMethod.POST, "/api/fornecedores/**").hasAnyRole("ADMIN", "GERANT", "ACHETEUR")
                .requestMatchers(HttpMethod.PUT, "/api/fornecedores/**").hasAnyRole("ADMIN", "GERANT", "ACHETEUR")
                .requestMatchers(HttpMethod.DELETE, "/api/fornecedores/**").hasRole("ADMIN")

                // ==========================================================
                // PRODUITS
                // ==========================================================
                .requestMatchers(HttpMethod.POST, "/api/produtos/**").hasAnyRole("ADMIN", "GERANT")
                .requestMatchers(HttpMethod.PUT, "/api/produtos/**").hasAnyRole("ADMIN", "GERANT")
                .requestMatchers(HttpMethod.DELETE, "/api/produtos/**").hasRole("ADMIN")

                // ==========================================================
                // MOUVEMENTS
                // ==========================================================
                .requestMatchers(HttpMethod.POST, "/api/movimentacoes/**")
                    .hasAnyRole("ADMIN", "GERANT", "MAGASINIER", "VENDEUR", "ACHETEUR")

                // ==========================================================
                // UTILISATEURS : ADMIN uniquement
                // ==========================================================
                .requestMatchers("/api/usuarios/**").hasRole("ADMIN")

                // ==========================================================
                // RESTE : authentifié
                // ==========================================================
                .anyRequest().authenticated()
            )
            .authenticationProvider(authProvider())
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsSource() {
        CorsConfiguration c = new CorsConfiguration();
        c.setAllowedOrigins(List.of("http://localhost:4200"));
        c.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
        c.setAllowedHeaders(List.of("*"));
        c.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource src = new UrlBasedCorsConfigurationSource();
        src.registerCorsConfiguration("/**", c);
        return src;
    }
}
