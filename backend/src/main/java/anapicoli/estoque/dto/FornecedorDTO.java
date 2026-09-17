package anapicoli.estoque.dto;

import jakarta.validation.constraints.*;
import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class FornecedorDTO {
    private Long id;
    @NotBlank
    private String nome;
    private String cnpj;
    private String telefone;
    @Email
    private String email;
}
