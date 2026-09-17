package anapicoli.estoque.controller;

import anapicoli.estoque.dto.MovimentacaoDTO;
import anapicoli.estoque.service.MovimentacaoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/movimentacoes")
@RequiredArgsConstructor
public class MovimentacaoController {
    private final MovimentacaoService service;

    @GetMapping
    public List<MovimentacaoDTO> listar(@RequestParam Long produtoId) {
        return service.findByProduto(produtoId);
    }

    @PostMapping
    public ResponseEntity<MovimentacaoDTO> registrar(@Valid @RequestBody MovimentacaoDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.registrar(dto));
    }
}
