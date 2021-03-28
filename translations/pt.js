const pt = {
    components: {
        items_list: {
            due_date: 'Vencimento: ',
            late: 'Atraso',
            paid: 'Pago',
            received: 'Recebido',
            done: 'Feito',
        },
        language_dropdown: {
            label: 'Idioma:',
            options: {
                english: 'Inglês',
                portuguese: 'Português',
            }
        },
        footer: {
            total: {
                revenue: 'Rendimentos:',
                expense: 'Despesas:',
                balance: 'Saldo mensal:',
                to_pay: 'Total a pagar:',
                to_receive: 'Total a receber:',
            },
        },
        menu_left: {
            home: 'Página Inicial',
            revenues: 'Rendimentos',
            expenses: 'Despesas',
            settings: 'Configurações',
            version: 'Versão:',
        },
        plus_button_menu: {
            add_revenue: 'Rendimento',
            add_expense: 'Despesa'
        },
        save_modal: {
            revenue_title: 'Salvar Rendimento',
            expense_title: 'Salvar Despesa',
            default_title: 'Salvar Item',
            save: 'Salvar apenas este',
            save_all: 'Salvar todos',
            cancel: 'Cancelar',
        },
        remove_modal: {
            revenue_title: 'Remover Rendimento',
            expense_title: 'Remover Despesa',
            default_title: 'Remover Item',
            remove: 'Remover apenas este',
            remove_all: 'Remover todos',
            cancel: 'Cancelar',
        },
    },
    pages: {
        about: {
            title: 'Sobre',
        },
        add_item: {
            title_expense: 'Adicionar Despesa',
            title_revenue: 'Adicionar Rendimento',
            default_title: 'Adicionar Item',
            description: 'Descrição',
            value: 'Valor',
            due_date: 'Vencimento',
            recurring: 'Repetir',
            recurring_always: 'Sempre',
            recurring_installments: 'Parcelas',
            save: 'Salvar',
        },
        edit_item: {
            title_expense: 'Editar Despesa',
            title_revenue: 'Editar Rendimento',
            default_title: 'Editar Item',
            description: 'Descrição',
            value: 'Valor',
            due_date: 'Vencimento',
            recurring: 'Repetir',
            recurring_always: 'Sempre',
            recurring_installments: 'Parcelas',
            save: 'Salvar',
            remove: 'Remover',
        },
        view_item: {
            title_expense: 'Despesa',
            title_revenue: 'Rendimento',
            default_title: 'Visualizar Item',
            description: 'Descrição',
            value: 'Valor',
            due_date: 'Vencimento',
            edit: 'Editar',
        },
        home: {
            default_title: 'Monei Ctrl',
            expenses_title: 'Despesas',
            revenues_title: 'Rendimentos',
        },
        settings: {
            title: 'Configurações',
            language: 'Idioma',
        }
    }
}
export default pt;