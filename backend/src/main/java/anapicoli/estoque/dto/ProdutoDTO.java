package anapicoli.estoque.dto;

import jakarta.validation.constraints.*;
import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class ProdutoDTO {
    private Long id;
    @NotBlank
    private String nome;
    private String descricao;
    @NotNull @PositiveOrZero
    private Double preco;
    @NotNull @PositiveOrZero
    private Integer quantidade;
    private Long categoriaId;
    private String categoriaNome;
    private Long fornecedorId;
    private String fornecedorNome;
}
