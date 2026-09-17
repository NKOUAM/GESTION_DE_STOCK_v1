package anapicoli.estoque.service;

import anapicoli.estoque.dto.ProdutoDTO;
import anapicoli.estoque.exception.*;
import anapicoli.estoque.model.*;
import anapicoli.estoque.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProdutoService {

    private final ProdutoRepository repo;
    private final CategoriaRepository categoriaRepo;
    private final FornecedorRepository fornecedorRepo;

    public List<ProdutoDTO> findAll() {
        return repo.findAllAsDTO();
    }

    public ProdutoDTO findById(Long id) {
        return repo.findByIdAsDTO(id)
                .orElseThrow(() -> new ResourceNotFoundException("Produit introuvable : " + id));
    }

    @Transactional
    public ProdutoDTO create(ProdutoDTO dto) {
        if (repo.existsByNomeIgnoreCase(dto.getNome())) {
            throw new BusinessException("Ce produit existe déjà");
        }
        Produto p = Produto.builder()
                .nome(dto.getNome())
                .descricao(dto.getDescricao())
                .preco(dto.getPreco())
                .quantidade(dto.getQuantidade())
                .categoria(resolveCat(dto.getCategoriaId()))
                .fornecedor(resolveForn(dto.getFornecedorId()))
                .build();
        Produto saved = repo.save(p);
        return repo.findByIdAsDTO(saved.getId())
                .orElseThrow(() -> new RuntimeException("Erreur création"));
    }

    @Transactional
    public ProdutoDTO update(Long id, ProdutoDTO dto) {
        Produto p = repo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Produit introuvable : " + id));
        p.setNome(dto.getNome());
        p.setDescricao(dto.getDescricao());
        p.setPreco(dto.getPreco());
        p.setQuantidade(dto.getQuantidade());
        p.setCategoria(resolveCat(dto.getCategoriaId()));
        p.setFornecedor(resolveForn(dto.getFornecedorId()));
        repo.save(p);
        return repo.findByIdAsDTO(id)
                .orElseThrow(() -> new RuntimeException("Erreur mise à jour"));
    }

    @Transactional
    public void delete(Long id) {
        if (!repo.existsById(id)) {
            throw new ResourceNotFoundException("Produit introuvable : " + id);
        }
        repo.deleteById(id);
    }

    private Categoria resolveCat(Long id) {
        if (id == null) return null;
        return categoriaRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Catégorie introuvable : " + id));
    }

    private Fornecedor resolveForn(Long id) {
        if (id == null) return null;
        return fornecedorRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Fournisseur introuvable : " + id));
    }
}
