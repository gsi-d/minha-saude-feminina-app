"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test = require("node:test");
const assert = require("node:assert/strict");
const enums_1 = require("../constants/enums");
const authRegistration_1 = require("../contexts/authRegistration");
const cadastroBase = {
    nome: 'Nova Usuaria',
    email: 'nova@ciclo.com',
    senha: '123456',
    telefone: '11999999999',
    dataNascimento: '1999-01-20',
};
test('buildUsuarioCadastro mapeia gravida para gestante', () => {
    const usuario = (0, authRegistration_1.buildUsuarioCadastro)(cadastroBase, 'gravida');
    assert.equal(usuario.tipoUsuario, enums_1.enumTipoUsuario.Gestante);
    assert.equal(usuario.nome, cadastroBase.nome);
    assert.equal(usuario.email, cadastroBase.email);
});
test('buildUsuarioCadastro mapeia tentante corretamente', () => {
    const usuario = (0, authRegistration_1.buildUsuarioCadastro)(cadastroBase, 'tentante');
    assert.equal(usuario.tipoUsuario, enums_1.enumTipoUsuario.Tentante);
});
test('buildUsuarioCadastro mapeia adolescente corretamente', () => {
    const usuario = (0, authRegistration_1.buildUsuarioCadastro)(cadastroBase, 'adolescente');
    assert.equal(usuario.tipoUsuario, enums_1.enumTipoUsuario.Adolescente);
});
test('buildUsuarioCadastro mapeia menopausa corretamente', () => {
    const usuario = (0, authRegistration_1.buildUsuarioCadastro)(cadastroBase, 'menopausa');
    assert.equal(usuario.tipoUsuario, enums_1.enumTipoUsuario.Menopausa);
});
test('finalizeCadastroEmMemoria insere usuario novo na lista', () => {
    const usuarios = [
        {
            id: '1',
            nome: 'Existente',
            email: 'existente@ciclo.com',
            senha: '123',
            dataNascimento: '1990-01-01',
            tipoUsuario: enums_1.enumTipoUsuario.NaoDefinido,
            administrador: false,
            dataCadastro: '2026-01-01T00:00:00.000Z',
            telefone: '11911111111',
        },
    ];
    const resultado = (0, authRegistration_1.finalizeCadastroEmMemoria)(usuarios, cadastroBase, 'gravida');
    assert.equal(resultado.success, true);
    assert.equal(resultado.usuariosAtualizados.length, 2);
    assert.equal(resultado.novoUsuario?.tipoUsuario, enums_1.enumTipoUsuario.Gestante);
    assert.equal(resultado.novoUsuario?.email, cadastroBase.email);
});
test('finalizeCadastroEmMemoria bloqueia email duplicado', () => {
    const usuarios = [
        {
            id: '1',
            nome: 'Existente',
            email: cadastroBase.email,
            senha: '123',
            dataNascimento: '1990-01-01',
            tipoUsuario: enums_1.enumTipoUsuario.NaoDefinido,
            administrador: false,
            dataCadastro: '2026-01-01T00:00:00.000Z',
            telefone: '11911111111',
        },
    ];
    const resultado = (0, authRegistration_1.finalizeCadastroEmMemoria)(usuarios, cadastroBase, 'tentante');
    assert.equal(resultado.success, false);
    assert.equal(resultado.novoUsuario, undefined);
    assert.equal(resultado.usuariosAtualizados.length, 1);
});
