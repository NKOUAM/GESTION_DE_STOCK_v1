package anapicoli.estoque.dto;

import anapicoli.estoque.model.Role;
import jakarta.validation.constraints.*;
import lombok.*;

@Data @NoArgsConstructor @AllArgsConstructor
public class RegisterRequest {
    @NotBlank @Size(min = 3, max = 50) private String username;
    @NotBlank @Size(min = 6) private String password;
    @NotBlank private String nome;
    @Email private String email;
    @NotNull private Role role;
}
