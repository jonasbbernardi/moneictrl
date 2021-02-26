export default pt = {
    components: {
        all_items_list: {
            due_date: 'Vencimento:',
            late: 'Atraso',
            paid: 'Pago',
            received: 'Recebido',
            done: 'Feito',
        },
        footer: {
            total: {
                revenue: 'Rendimentos:',
                expense: 'Despesas:',
                balance: 'Saldo total:',
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
    },
    pages: {
        add_item: {
            title_expense: 'Adicionar Despesa',
            title_revenue: 'Adicionar Rendimento',
            default_title: 'Adicionar Item',
            description: 'Descrição',
            value: 'Valor',
            due_date: 'Vencimento',
            save: 'Salvar',
        },
        edit_item: {
            title_expense: 'Editar Despesa',
            title_revenue: 'Editar Rendimento',
            default_title: 'Editar Item',
            description: 'Descrição',
            value: 'Valor',
            due_date: 'Vencimento',
            save: 'Salvar',
            remove: 'Remover',
        },
        view_item: {
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
            select_language: 'Idioma:',
            options: {
                english: 'Inglês',
                portuguese: 'Português',
            }
        }
    }
}