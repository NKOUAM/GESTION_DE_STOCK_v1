package anapicoli.estoque.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

@Entity @Table(name = "fornecedor")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Fornecedor {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank @Column(nullable = false)
    private String nome;
    private String cnpj;
    private String telefone;
    @Email
    private String email;
}
