package anapicoli.estoque.mapper;

import anapicoli.estoque.dto.MovimentacaoDTO;
import anapicoli.estoque.model.MovimentacaoEstoque;
import org.springframework.stereotype.Component;

@Component
public class MovimentacaoMapper {
    public MovimentacaoDTO toDTO(MovimentacaoEstoque m) {
        if (m == null) return null;
        return MovimentacaoDTO.builder()
                .id(m.getId()).tipo(m.getTipo()).quantidade(m.getQuantidade())
                .observacao(m.getObservacao()).data(m.getData())
                .produtoId(m.getProduto() != null ? m.getProduto().getId() : null)
                .produtoNome(m.getProduto() != null ? m.getProduto().getNome() : null)
                .build();
    }
}
