package anapicoli.estoque.controller;

import anapicoli.estoque.dto.CategoriaDTO;
import anapicoli.estoque.service.CategoriaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/categorias")
@RequiredArgsConstructor
public class CategoriaController {
    private final CategoriaService service;

    @GetMapping public List<CategoriaDTO> listar() { return service.findAll(); }
    @GetMapping("/{id}") public CategoriaDTO buscar(@PathVariable Long id) { return service.findById(id); }

    @PostMapping
    public ResponseEntity<CategoriaDTO> criar(@Valid @RequestBody CategoriaDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(dto));
    }

    @PutMapping("/{id}")
    public CategoriaDTO atualizar(@PathVariable Long id, @Valid @RequestBody CategoriaDTO dto) {
        return service.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
