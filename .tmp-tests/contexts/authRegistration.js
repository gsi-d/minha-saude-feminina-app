"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapPerfilParaTipoUsuario = mapPerfilParaTipoUsuario;
exports.buildUsuarioCadastro = buildUsuarioCadastro;
exports.finalizeCadastroEmMemoria = finalizeCadastroEmMemoria;
const enums_1 = require("../constants/enums");
function mapPerfilParaTipoUsuario(perfil) {
    switch (perfil) {
        case 'gravida':
            return enums_1.enumTipoUsuario.Gestante;
        case 'tentante':
            return enums_1.enumTipoUsuario.Tentante;
        case 'adolescente':
            return enums_1.enumTipoUsuario.Adolescente;
        case 'menopausa':
            return enums_1.enumTipoUsuario.Menopausa;
    }
}
function buildUsuarioCadastro(dadosBasicos, perfil) {
    return {
        ...dadosBasicos,
        tipoUsuario: mapPerfilParaTipoUsuario(perfil),
        administrador: false,
    };
}
function finalizeCadastroEmMemoria(usuariosAtuais, dadosBasicos, perfil) {
    const emailJaExiste = usuariosAtuais.some((usuario) => usuario.email === dadosBasicos.email);
    if (emailJaExiste) {
        return {
            success: false,
            usuariosAtualizados: usuariosAtuais,
        };
    }
    const novoUsuario = {
        ...buildUsuarioCadastro(dadosBasicos, perfil),
        id: Math.random().toString(36).substring(2, 9),
        dataCadastro: new Date().toISOString(),
    };
    return {
        success: true,
        novoUsuario,
        usuariosAtualizados: [...usuariosAtuais, novoUsuario],
    };
}
