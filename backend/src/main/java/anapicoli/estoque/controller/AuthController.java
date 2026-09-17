package anapicoli.estoque.controller;

import anapicoli.estoque.dto.*;
import anapicoli.estoque.exception.BusinessException;
import anapicoli.estoque.model.Usuario;
import anapicoli.estoque.repository.UsuarioRepository;
import anapicoli.estoque.security.JwtService;
import anapicoli.estoque.service.PasswordService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authManager;
    private final JwtService jwtService;
    private final UsuarioRepository usuarioRepo;
    private final PasswordEncoder encoder;
    private final PasswordService passwordService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest req) {
        Authentication auth = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(req.getUsername(), req.getPassword()));

        Usuario u = usuarioRepo.findByUsername(req.getUsername()).orElseThrow();
        String token = jwtService.generateToken(u.getUsername(), u.getRole().name());

        return ResponseEntity.ok(LoginResponse.builder()
                .token(token)
                .id(u.getId())
                .username(u.getUsername())
                .nome(u.getNome())
                .email(u.getEmail())
                .role(u.getRole())
                .build());
    }

    @PostMapping("/register")
    public ResponseEntity<UsuarioDTO> register(@Valid @RequestBody RegisterRequest req) {
        if (usuarioRepo.existsByUsername(req.getUsername()))
            throw new BusinessException("Nom d'utilisateur déjà pris");
        if (req.getEmail() != null && usuarioRepo.existsByEmail(req.getEmail()))
            throw new BusinessException("Email déjà utilisé");

        Usuario u = Usuario.builder()
                .username(req.getUsername())
                .password(encoder.encode(req.getPassword()))
                .nome(req.getNome())
                .email(req.getEmail())
                .role(req.getRole())
                .actif(true)
                .build();

        u = usuarioRepo.save(u);
        return ResponseEntity.ok(UsuarioDTO.builder()
                .id(u.getId())
                .username(u.getUsername())
                .nome(u.getNome())
                .email(u.getEmail())
                .role(u.getRole())
                .actif(u.getActif())
                .build());
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<ForgotPasswordResponse> forgotPassword(@Valid @RequestBody ForgotPasswordRequest req) {
        return ResponseEntity.ok(passwordService.forgotPassword(req));
    }

    @PostMapping("/reset-password")
    public ResponseEntity<Map<String, String>> resetPassword(@Valid @RequestBody ResetPasswordRequest req) {
        passwordService.resetPassword(req);
        return ResponseEntity.ok(Map.of("message", "Mot de passe réinitialisé avec succès"));
    }

    @PostMapping("/change-password")
    public ResponseEntity<Map<String, String>> changePassword(
            @Valid @RequestBody ChangePasswordRequest req,
            Authentication auth) {
        passwordService.changePassword(auth.getName(), req);
        return ResponseEntity.ok(Map.of("message", "Mot de passe modifié avec succès"));
    }
}
