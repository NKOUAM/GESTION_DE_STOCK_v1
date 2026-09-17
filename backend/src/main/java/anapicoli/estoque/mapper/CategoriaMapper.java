package anapicoli.estoque.mapper;

import anapicoli.estoque.dto.CategoriaDTO;
import anapicoli.estoque.model.Categoria;
import org.springframework.stereotype.Component;

@Component
public class CategoriaMapper {
    public CategoriaDTO toDTO(Categoria c) {
        if (c == null) return null;
        return CategoriaDTO.builder().id(c.getId()).nome(c.getNome()).build();
    }
    public Categoria toEntity(CategoriaDTO d) {
        return Categoria.builder().id(d.getId()).nome(d.getNome()).build();
    }
}
