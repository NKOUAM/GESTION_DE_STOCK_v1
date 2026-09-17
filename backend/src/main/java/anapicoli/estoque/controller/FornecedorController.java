package anapicoli.estoque.controller;

import anapicoli.estoque.dto.FornecedorDTO;
import anapicoli.estoque.service.FornecedorService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/fornecedores")
@RequiredArgsConstructor
public class FornecedorController {
    private final FornecedorService service;

    @GetMapping public List<FornecedorDTO> listar() { return service.findAll(); }
    @GetMapping("/{id}") public FornecedorDTO buscar(@PathVariable Long id) { return service.findById(id); }

    @PostMapping
    public ResponseEntity<FornecedorDTO> criar(@Valid @RequestBody FornecedorDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(dto));
    }

    @PutMapping("/{id}")
    public FornecedorDTO atualizar(@PathVariable Long id, @Valid @RequestBody FornecedorDTO dto) {
        return service.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
