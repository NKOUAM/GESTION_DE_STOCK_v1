package anapicoli.estoque.controller;

import anapicoli.estoque.dto.UsuarioDTO;
import anapicoli.estoque.exception.ResourceNotFoundException;
import anapicoli.estoque.model.Usuario;
import anapicoli.estoque.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class UsuarioController {

    private final UsuarioRepository repo;

    @GetMapping
    public List<UsuarioDTO> listar() {
        return repo.findAll().stream().map(this::toDTO).toList();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        if (!repo.existsById(id)) throw new ResourceNotFoundException("Utilisateur introuvable : " + id);
        repo.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/actif")
    public UsuarioDTO toggleActif(@PathVariable Long id) {
        Usuario u = repo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Utilisateur introuvable"));
        u.setActif(!Boolean.TRUE.equals(u.getActif()));
        return toDTO(repo.save(u));
    }

    private UsuarioDTO toDTO(Usuario u) {
        return UsuarioDTO.builder()
                .id(u.getId())
                .username(u.getUsername())
                .nome(u.getNome())
                .email(u.getEmail())
                .role(u.getRole())
                .actif(u.getActif())
                .build();
    }
}
