package anapicoli.estoque.service;

import anapicoli.estoque.dto.MovimentacaoDTO;
import anapicoli.estoque.exception.*;
import anapicoli.estoque.mapper.MovimentacaoMapper;
import anapicoli.estoque.model.*;
import anapicoli.estoque.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;

@Service @RequiredArgsConstructor
public class MovimentacaoService {
    private final MovimentacaoEstoqueRepository repo;
    private final ProdutoRepository produtoRepo;
    private final MovimentacaoMapper mapper;

    public List<MovimentacaoDTO> findByProduto(Long produtoId) {
        return repo.findByProdutoIdOrderByDataDesc(produtoId).stream().map(mapper::toDTO).toList();
    }

    @Transactional
    public MovimentacaoDTO registrar(MovimentacaoDTO dto) {
        Produto produto = produtoRepo.findById(dto.getProdutoId())
                .orElseThrow(() -> new ResourceNotFoundException("Produit introuvable : " + dto.getProdutoId()));

        if (dto.getTipo() == TipoMovimentacao.SAIDA) {
            if (produto.getQuantidade() < dto.getQuantidade())
                throw new BusinessException("Stock insuffisant. Disponible : " + produto.getQuantidade());
            produto.setQuantidade(produto.getQuantidade() - dto.getQuantidade());
        } else {
            produto.setQuantidade(produto.getQuantidade() + dto.getQuantidade());
        }
        produtoRepo.save(produto);

        MovimentacaoEstoque m = MovimentacaoEstoque.builder()
                .tipo(dto.getTipo()).quantidade(dto.getQuantidade())
                .observacao(dto.getObservacao()).data(LocalDateTime.now())
                .produto(produto).build();
        return mapper.toDTO(repo.save(m));
    }
}
