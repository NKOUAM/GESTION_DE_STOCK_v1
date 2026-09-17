package anapicoli.estoque.mapper;

import anapicoli.estoque.dto.ProdutoDTO;
import anapicoli.estoque.model.Produto;
import org.springframework.stereotype.Component;

@Component
public class ProdutoMapper {
    public ProdutoDTO toDTO(Produto p) {
        if (p == null) return null;
        return ProdutoDTO.builder()
                .id(p.getId()).nome(p.getNome()).descricao(p.getDescricao())
                .preco(p.getPreco()).quantidade(p.getQuantidade())
                .categoriaId(p.getCategoria() != null ? p.getCategoria().getId() : null)
                .categoriaNome(p.getCategoria() != null ? p.getCategoria().getNome() : null)
                .fornecedorId(p.getFornecedor() != null ? p.getFornecedor().getId() : null)
                .fornecedorNome(p.getFornecedor() != null ? p.getFornecedor().getNome() : null)
                .build();
    }
}
