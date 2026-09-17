package anapicoli.estoque.dto;

import anapicoli.estoque.model.Role;
import lombok.*;

@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class UsuarioDTO {
    private Long id;
    private String username;
    private String nome;
    private String email;
    private Role role;
    private Boolean actif;
}
