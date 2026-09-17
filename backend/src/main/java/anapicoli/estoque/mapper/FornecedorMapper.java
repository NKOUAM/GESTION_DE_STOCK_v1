package anapicoli.estoque.mapper;

import anapicoli.estoque.dto.FornecedorDTO;
import anapicoli.estoque.model.Fornecedor;
import org.springframework.stereotype.Component;

@Component
public class FornecedorMapper {
    public FornecedorDTO toDTO(Fornecedor f) {
        if (f == null) return null;
        return FornecedorDTO.builder().id(f.getId()).nome(f.getNome())
                .cnpj(f.getCnpj()).telefone(f.getTelefone()).email(f.getEmail()).build();
    }
    public Fornecedor toEntity(FornecedorDTO d) {
        return Fornecedor.builder().id(d.getId()).nome(d.getNome())
                .cnpj(d.getCnpj()).telefone(d.getTelefone()).email(d.getEmail()).build();
    }
}
