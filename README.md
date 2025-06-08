Planejador Semanal para Educação Infantil📝 DescriçãoEsta é uma ferramenta web desenvolvida para auxiliar professores e pedagogos da Educação Infantil na criação de planejamentos de aula semanais. O sistema é baseado em um formulário intuitivo que permite alinhar as atividades propostas com os Campos de Experiência e os Objetivos de Aprendizagem e Desenvolvimento específicos de cada ciclo, conforme o currículo escolar.Ao final do preenchimento, a ferramenta gera um documento PDF profissional, leve e otimizado para impressão, consolidando todo o planejamento da semana de forma clara e organizada.✨ Funcionalidades PrincipaisFormulário Intuitivo: Interface limpa e organizada para planejar a semana, de Segunda a Sexta-feira.Seleção de Ciclo: Permite escolher entre os ciclos definidos (Maternal II, Maternal Integral II, Jardim I, Jardim II).Currículo Dinâmico: Carrega automaticamente os Campos de Experiência, Objetivos e Habilidades correspondentes ao ciclo selecionado.Seleção em Cascata: O professor seleciona o Campo de Experiência, depois o Objetivo e, por fim, a Habilidade, em um fluxo de trabalho lógico e sem erros.Campos Adicionais: Inclui seções para "Atividades Propostas", "Aulas com Especialistas" (Arte, Educação Física, Inglês) e "Observações".Geração de PDF de Alta Qualidade: Cria um documento PDF leve, com texto nítido, selecionável e com quebra de página inteligente, que evita cortar os quadros dos dias.🚀 Como Executar o ProjetoPara usar a ferramenta localmente, siga estes passos:Estrutura de Pastas: Garanta que todos os 4 arquivos estejam na mesma pasta:/seu-projeto
|-- index.html
|-- style.css
|-- script.js
|-- curriculum.json
Abrir no Navegador: A maneira mais simples é abrir o arquivo index.html diretamente no seu navegador (Google Chrome, Firefox, etc.).(Recomendado) Usando o VS Code e Live Server:Instale a extensão Live Server no Visual Studio Code.Abra a pasta do projeto no VS Code.Clique no botão "Go Live" no canto inferior direito do editor. Isso iniciará um servidor local e garantirá que o arquivo curriculum.json seja sempre carregado corretamente.🔧 Como Personalizar o CurrículoO coração da ferramenta está no arquivo curriculum.json. Para adicionar, remover ou editar objetivos e habilidades, você só precisa editar este arquivo.Estrutura do curriculum.jsonO arquivo segue uma estrutura hierárquica:{
  "nome_do_ciclo": {
    "campo_de_experiencia": [
      { 
        "code": "CÓDIGO_DO_OBJETIVO", 
        "objective": "Descrição completa do objetivo.",
        "skills": [
          "Descrição da primeira habilidade.",
          "Descrição da segunda habilidade.",
          "Pode adicionar quantas habilidades quiser aqui."
        ] 
      }
    ]
  }
}
nome_do_ciclo: Deve corresponder aos valores definidos no index.html (ex: maternal_ii, jardim_i).campo_de_experiencia: Deve corresponder aos campos definidos no script.js (ex: eu_outro_nos, corpo_gestos).code: O código único do objetivo (ex: (EI02EO01)).objective: A descrição completa do objetivo.skills: Uma lista de textos, onde cada texto é uma habilidade associada ao código do objetivo.🛠️ Tecnologias UtilizadasHTML5CSS3Tailwind CSS - Framework CSS para estilização rápida.JavaScript (ES6+) - Lógica principal da aplicação.jsPDF - Biblioteca para a criação de documentos PDF no cliente.jsPDF-AutoTable - Plugin para jsPDF que facilita a criação de tabelas.👩‍🏫 AutoriaDesenvolvido com carinho por:Profa. Esp. Tatiane Ribeiro dos AnjosProfessora PedagogaEsp. em Administração, Coordenação e Supervisão EscolarEsp. Contação de História e Musicalização InfantilEsp. Lúdico e Psicomotricidade na Educação InfantilCurrículo Lattes: http://lattes.cnpq.br/8253880208218133© 2025 - Tecnologias Educacionais - Todos os direitos reservados.