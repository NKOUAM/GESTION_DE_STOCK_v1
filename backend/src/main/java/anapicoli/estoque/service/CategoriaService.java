package anapicoli.estoque.service;

import anapicoli.estoque.dto.CategoriaDTO;
import anapicoli.estoque.exception.*;
import anapicoli.estoque.mapper.CategoriaMapper;
import anapicoli.estoque.model.Categoria;
import anapicoli.estoque.repository.CategoriaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service @RequiredArgsConstructor
public class CategoriaService {
    private final CategoriaRepository repo;
    private final CategoriaMapper mapper;

    public List<CategoriaDTO> findAll() { return repo.findAll().stream().map(mapper::toDTO).toList(); }

    public CategoriaDTO findById(Long id) {
        return mapper.toDTO(repo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Catégorie introuvable : " + id)));
    }

    @Transactional
    public CategoriaDTO create(CategoriaDTO dto) {
        if (repo.existsByNomeIgnoreCase(dto.getNome())) throw new BusinessException("Cette catégorie existe déjà");
        return mapper.toDTO(repo.save(mapper.toEntity(dto)));
    }

    @Transactional
    public CategoriaDTO update(Long id, CategoriaDTO dto) {
        Categoria c = repo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Catégorie introuvable : " + id));
        c.setNome(dto.getNome());
        return mapper.toDTO(repo.save(c));
    }

    @Transactional
    public void delete(Long id) {
        if (!repo.existsById(id)) throw new ResourceNotFoundException("Catégorie introuvable : " + id);
        repo.deleteById(id);
    }
}
