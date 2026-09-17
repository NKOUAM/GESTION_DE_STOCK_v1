package anapicoli.estoque.config;

import anapicoli.estoque.model.*;
import anapicoli.estoque.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UsuarioRepository repo;
    private final PasswordEncoder encoder;

    @Override
    public void run(String... args) {
        createIfNotExists("admin",       "admin123",       "Administrateur",  "admin@estoque.com",       Role.ADMIN);
        createIfNotExists("gerant",      "gerant123",      "Gérant",          "gerant@estoque.com",      Role.GERANT);
        createIfNotExists("magasinier",  "magasin123",     "Magasinier",      "magasinier@estoque.com",  Role.MAGASINIER);
        createIfNotExists("vendeur",     "vendeur123",     "Vendeur",         "vendeur@estoque.com",     Role.VENDEUR);
        createIfNotExists("acheteur",    "acheteur123",    "Acheteur",        "acheteur@estoque.com",    Role.ACHETEUR);
        createIfNotExists("comptable",   "comptable123",   "Comptable",       "comptable@estoque.com",   Role.COMPTABLE);
        createIfNotExists("observateur", "observateur123", "Observateur",     "observateur@estoque.com", Role.OBSERVATEUR);
    }

    private void createIfNotExists(String username, String password, String nome, String email, Role role) {
        if (repo.existsByUsername(username)) return;
        repo.save(Usuario.builder()
                .username(username)
                .password(encoder.encode(password))
                .nome(nome)
                .email(email)
                .role(role)
                .actif(true)
                .build());
        System.out.println(">>> Utilisateur créé : " + username + " / " + password + " (" + role + ")");
    }
}
