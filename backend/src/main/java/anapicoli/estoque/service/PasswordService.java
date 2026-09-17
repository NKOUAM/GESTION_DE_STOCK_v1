package anapicoli.estoque.service;

import anapicoli.estoque.dto.*;
import anapicoli.estoque.exception.BusinessException;
import anapicoli.estoque.exception.ResourceNotFoundException;
import anapicoli.estoque.model.PasswordResetToken;
import anapicoli.estoque.model.Usuario;
import anapicoli.estoque.repository.PasswordResetTokenRepository;
import anapicoli.estoque.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PasswordService {

    private final UsuarioRepository usuarioRepo;
    private final PasswordResetTokenRepository tokenRepo;
    private final PasswordEncoder encoder;

    @Transactional
    public ForgotPasswordResponse forgotPassword(ForgotPasswordRequest req) {
        Usuario u = usuarioRepo.findAll().stream()
                .filter(x -> req.getEmail().equalsIgnoreCase(x.getEmail()))
                .findFirst()
                .orElse(null);

        if (u == null) {
            // Ne pas révéler si l'email existe ou non (sécurité)
            return ForgotPasswordResponse.builder()
                    .message("Si un compte existe avec cet email, vous recevrez un lien de réinitialisation.")
                    .build();
        }

        // Supprimer les anciens tokens
        tokenRepo.deleteByUsuarioId(u.getId());

        String token = UUID.randomUUID().toString().replace("-", "");
        PasswordResetToken prt = PasswordResetToken.builder()
                .token(token)
                .usuario(u)
                .expiration(LocalDateTime.now().plusMinutes(30))
                .utilisé(false)
                .build();
        tokenRepo.save(prt);

        String link = "http://localhost:4200/reset-password?token=" + token;

        // En production : envoyer par email
        System.out.println("========================================================");
        System.out.println(">>> MOT DE PASSE OUBLIÉ");
        System.out.println(">>> Utilisateur : " + u.getUsername() + " (" + u.getEmail() + ")");
        System.out.println(">>> Lien : " + link);
        System.out.println(">>> Expire dans 30 minutes");
        System.out.println("========================================================");

        return ForgotPasswordResponse.builder()
                .message("Si un compte existe avec cet email, vous recevrez un lien de réinitialisation.")
                .devToken(token)      // retirer en production
                .devResetLink(link)   // retirer en production
                .build();
    }

    @Transactional
    public void resetPassword(ResetPasswordRequest req) {
        PasswordResetToken prt = tokenRepo.findByToken(req.getToken())
                .orElseThrow(() -> new BusinessException("Lien de réinitialisation invalide"));

        if (Boolean.TRUE.equals(prt.getUtilisé())) {
            throw new BusinessException("Ce lien a déjà été utilisé");
        }
        if (prt.isExpired()) {
            throw new BusinessException("Ce lien a expiré. Veuillez en demander un nouveau.");
        }

        Usuario u = prt.getUsuario();
        u.setPassword(encoder.encode(req.getNewPassword()));
        usuarioRepo.save(u);

        prt.setUtilisé(true);
        tokenRepo.save(prt);

        System.out.println(">>> Mot de passe réinitialisé pour : " + u.getUsername());
    }

    @Transactional
    public void changePassword(String username, ChangePasswordRequest req) {
        Usuario u = usuarioRepo.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("Utilisateur introuvable"));

        if (!encoder.matches(req.getCurrentPassword(), u.getPassword())) {
            throw new BusinessException("Mot de passe actuel incorrect");
        }
        if (encoder.matches(req.getNewPassword(), u.getPassword())) {
            throw new BusinessException("Le nouveau mot de passe doit être différent de l'ancien");
        }

        u.setPassword(encoder.encode(req.getNewPassword()));
        usuarioRepo.save(u);
    }
}
