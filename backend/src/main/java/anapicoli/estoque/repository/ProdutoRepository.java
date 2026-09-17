package anapicoli.estoque.repository;

import anapicoli.estoque.dto.ProdutoDTO;
import anapicoli.estoque.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {

    boolean existsByNomeIgnoreCase(String nome);

    @Query("SELECT new anapicoli.estoque.dto.ProdutoDTO(" +
           "p.id, p.nome, p.descricao, p.preco, p.quantidade, " +
           "c.id, c.nome, f.id, f.nome) " +
           "FROM Produto p " +
           "LEFT JOIN p.categoria c " +
           "LEFT JOIN p.fornecedor f")
    List<ProdutoDTO> findAllAsDTO();

    @Query("SELECT new anapicoli.estoque.dto.ProdutoDTO(" +
           "p.id, p.nome, p.descricao, p.preco, p.quantidade, " +
           "c.id, c.nome, f.id, f.nome) " +
           "FROM Produto p " +
           "LEFT JOIN p.categoria c " +
           "LEFT JOIN p.fornecedor f " +
           "WHERE p.id = :id")
    Optional<ProdutoDTO> findByIdAsDTO(Long id);
}
