package anapicoli.estoque.dto;

import anapicoli.estoque.model.TipoMovimentacao;
import jakarta.validation.constraints.*;
import lombok.*;
import java.time.LocalDateTime;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class MovimentacaoDTO {
    private Long id;
    @NotNull
    private TipoMovimentacao tipo;
    @NotNull @Positive
    private Integer quantidade;
    private String observacao;
    private LocalDateTime data;
    @NotNull
    private Long produtoId;
    private String produtoNome;
}
