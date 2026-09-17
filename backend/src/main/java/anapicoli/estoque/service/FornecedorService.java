package anapicoli.estoque.service;

import anapicoli.estoque.dto.FornecedorDTO;
import anapicoli.estoque.exception.ResourceNotFoundException;
import anapicoli.estoque.mapper.FornecedorMapper;
import anapicoli.estoque.model.Fornecedor;
import anapicoli.estoque.repository.FornecedorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service @RequiredArgsConstructor
public class FornecedorService {
    private final FornecedorRepository repo;
    private final FornecedorMapper mapper;

    public List<FornecedorDTO> findAll() { return repo.findAll().stream().map(mapper::toDTO).toList(); }

    public FornecedorDTO findById(Long id) {
        return mapper.toDTO(repo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Fournisseur introuvable : " + id)));
    }

    @Transactional
    public FornecedorDTO create(FornecedorDTO dto) { return mapper.toDTO(repo.save(mapper.toEntity(dto))); }

    @Transactional
    public FornecedorDTO update(Long id, FornecedorDTO dto) {
        Fornecedor f = repo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Fournisseur introuvable : " + id));
        f.setNome(dto.getNome()); f.setCnpj(dto.getCnpj());
        f.setTelefone(dto.getTelefone()); f.setEmail(dto.getEmail());
        return mapper.toDTO(repo.save(f));
    }

    @Transactional
    public void delete(Long id) {
        if (!repo.existsById(id)) throw new ResourceNotFoundException("Fournisseur introuvable : " + id);
        repo.deleteById(id);
    }
}
