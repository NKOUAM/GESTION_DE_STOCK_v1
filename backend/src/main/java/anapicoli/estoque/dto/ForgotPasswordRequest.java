package anapicoli.estoque.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data @NoArgsConstructor @AllArgsConstructor
public class ForgotPasswordRequest {
    @NotBlank @Email
    private String email;
}
