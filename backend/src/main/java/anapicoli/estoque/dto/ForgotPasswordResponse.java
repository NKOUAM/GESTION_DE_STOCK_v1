package anapicoli.estoque.dto;

import lombok.*;

@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class ForgotPasswordResponse {
    private String message;
    // ⚠️ En production, retirer ce champ
    private String devToken;
    private String devResetLink;
}
