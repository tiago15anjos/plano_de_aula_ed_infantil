// --- VARIÁVEIS GLOBAIS ---
let curriculumData = {}; // Objeto que guardará os dados do JSON
const weekDays = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira'];
const experienceFields = [
    { id: '', name: 'Selecione um Campo de Experiência' },
    { id: 'eu_outro_nos', name: 'O Eu, o Outro e o Nós' },
    { id: 'corpo_gestos', name: 'Corpo, Gestos e Movimentos' },
    { id: 'tracos_sons', name: 'Traços, Sons, Cores e Formas' },
    { id: 'escuta_fala', name: 'Escuta, Fala, Pensamento e Imaginação' },
    { id: 'espacos_tempos', name: 'Espaços, Tempos, Quantidades, Relações e Transformações' }
];
const specialistClasses = ['Arte', 'Educação Física', 'Inglês'];

// --- INICIALIZAÇÃO ---
// A função principal que é executada quando a página carrega
async function initializeApp() {
    try {
        const response = await fetch('curriculum.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        curriculumData = await response.json();
        
        generateWeekDaysUI();
        addEventListeners();

    } catch (error) {
        console.error("Não foi possível carregar os dados do currículo:", error);
        alert("Erro ao carregar dados do currículo. Verifique o arquivo curriculum.json e o console para mais detalhes.");
    }
}


// --- GERAÇÃO DE UI DINÂMICA ---
function generateWeekDaysUI() {
    const container = document.getElementById('week-days-container');
    if (!container) return;
    container.innerHTML = '';
    weekDays.forEach(day => {
        const dayId = day.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace('-feira', '');
        container.innerHTML += `
            <article id="day_${dayId}" class="border border-gray-200 rounded-xl p-6 transition-shadow hover:shadow-md">
                <h2 class="text-2xl font-bold text-sky-600 mb-6">${day}</h2>
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div class="space-y-6">
                        <div>
                            <h3 class="text-lg font-semibold text-gray-800 mb-3">Objetivos de Aprendizagem e Desenvolvimento</h3>
                            <div id="objectives-container-${dayId}" class="space-y-4">
                                <!-- Linhas de objetivos dinâmicos serão inseridas aqui -->
                            </div>
                            <button data-day="${dayId}" class="add-objective-btn mt-4 px-4 py-2 text-sm font-medium text-sky-700 bg-sky-100 rounded-lg hover:bg-sky-200 disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed" disabled>
                                + Adicionar Objetivo
                            </button>
                        </div>
                        <div>
                            <h3 class="text-lg font-semibold text-gray-800 mb-3">Aulas com Especialistas</h3>
                            <div class="flex flex-wrap gap-4">
                                ${specialistClasses.map(spec => `
                                    <div class="flex items-center">
                                        <input type="checkbox" id="${spec.toLowerCase()}_${dayId}" name="spec_class_${dayId}" class="h-4 w-4 text-sky-600 border-gray-300 rounded focus:ring-sky-500">
                                        <label for="${spec.toLowerCase()}_${dayId}" class="ml-2 text-sm font-medium text-gray-700">${spec}</label>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        <div>
                            <h3 class="text-lg font-semibold text-gray-800 mb-2">Observações:</h3>
                            <textarea id="observations_${dayId}" rows="4" class="w-full p-2 border border-gray-300 rounded-lg" placeholder="Acrescente informações relevantes caso necessário..."></textarea>
                        </div>
                    </div>
                    <div class="space-y-6">
                        <div>
                            <h3 class="text-lg font-semibold text-gray-800 mb-2">Atividades Propostas:</h3>
                            <textarea id="activities_${dayId}" rows="12" class="w-full p-2 border border-gray-300 rounded-lg" placeholder="Descreva as atividades, brincadeiras e momentos..."></textarea>
                        </div>
                    </div>
                </div>
            </article>
        `;
    });
}

function addObjectiveRow(dayId) {
    const ageGroup = document.getElementById('age-group').value;
    if (!ageGroup) {
        alert('Por favor, selecione o Ciclo da turma primeiro.');
        return;
    }
    const container = document.getElementById(`objectives-container-${dayId}`);
    const newRow = document.createElement('div');
    newRow.className = 'objective-row bg-gray-50 p-3 rounded-lg border';
    
    const fieldOptions = experienceFields.map(field => `<option value="${field.id}">${field.name}</option>`).join('');

    newRow.innerHTML = `
        <div class="flex items-center space-x-2">
            <div class="flex-1 space-y-2">
                <select class="field-select w-full p-2 border bg-white border-gray-300 rounded-lg" title="Campo de Experiência">
                    ${fieldOptions}
                </select>
                <select class="objective-select w-full p-2 border bg-white border-gray-300 rounded-lg" disabled title="Objetivo (Código)">
                    <option value="">1º Selecione o Campo</option>
                </select>
                <select class="skill-select w-full p-2 border bg-white border-gray-300 rounded-lg" disabled title="Habilidade (Descrição)">
                    <option value="">2º Selecione o Objetivo</option>
                </select>
            </div>
            <button type="button" class="remove-objective-btn self-start text-red-500 hover:text-red-700 font-bold p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" /></svg>
            </button>
        </div>
    `;
    container.appendChild(newRow);
}

// --- LÓGICA DE EVENTOS ---
function addEventListeners() {
    document.getElementById('generate-pdf').addEventListener('click', generateSummaryPdf);
    
    document.getElementById('age-group').addEventListener('change', function(event) {
        const isAgeGroupSelected = event.target.value !== '';
        document.querySelectorAll('.add-objective-btn').forEach(btn => btn.disabled = !isAgeGroupSelected);
        document.querySelectorAll('.objective-row').forEach(row => row.remove());
    });
    
    document.body.addEventListener('click', function(event) {
        const addBtn = event.target.closest('.add-objective-btn');
        if (addBtn && !addBtn.disabled) addObjectiveRow(addBtn.dataset.day);

        const removeBtn = event.target.closest('.remove-objective-btn');
        if (removeBtn) removeBtn.closest('.objective-row').remove();
    });

    document.body.addEventListener('change', function(event) {
        const ageGroup = document.getElementById('age-group').value;
        const row = event.target.closest('.objective-row');
        if (!row || !ageGroup) return;

        const fieldSelect = row.querySelector('.field-select');
        const objectiveSelect = row.querySelector('.objective-select');
        const skillSelect = row.querySelector('.skill-select');

        // Quando um CAMPO DE EXPERIÊNCIA é selecionado
        if (event.target.classList.contains('field-select')) {
            const fieldId = fieldSelect.value;
            objectiveSelect.innerHTML = '<option value="">Selecione o Objetivo</option>';
            skillSelect.innerHTML = '<option value="">2º Selecione o Objetivo</option>';
            objectiveSelect.disabled = true;
            skillSelect.disabled = true;

            if (fieldId && curriculumData[ageGroup] && curriculumData[ageGroup][fieldId]) {
                const objectives = curriculumData[ageGroup][fieldId];
                objectives.forEach(obj => {
                    const option = document.createElement('option');
                    option.value = obj.code;
                    option.textContent = `${obj.code} ${obj.objective}`;
                    option.title = obj.objective;
                    objectiveSelect.appendChild(option);
                });
                objectiveSelect.disabled = false;
            }
        }

        // Quando um OBJETIVO (código) é selecionado
        if (event.target.classList.contains('objective-select')) {
            const objectiveCode = objectiveSelect.value;
            skillSelect.innerHTML = '<option value="">Selecione a Habilidade</option>';
            skillSelect.disabled = true;

            if (objectiveCode) {
                const fieldId = fieldSelect.value;
                const objectivesList = (curriculumData[ageGroup] && curriculumData[ageGroup][fieldId]) ? curriculumData[ageGroup][fieldId] : [];
                
                const selectedObjective = objectivesList.find(obj => obj.code === objectiveCode);
                if (selectedObjective && selectedObjective.skills && Array.isArray(selectedObjective.skills)) {
                    skillSelect.innerHTML = '<option value="">Selecione a Habilidade</option>';
                    selectedObjective.skills.forEach(skillDesc => {
                        const option = document.createElement('option');
                        option.value = skillDesc;
                        option.textContent = skillDesc;
                        skillSelect.appendChild(option);
                    });
                    skillSelect.disabled = false;
                }
            }
        }
    });
}

// --- FUNÇÕES AUXILIARES ---
function getWeekDateRange(weekInput) {
    if (!weekInput) return 'Não informada';
    try {
        const [year, weekNum] = weekInput.split('-W').map(Number);
        
        const firstDayOfYear = new Date(year, 0, 1);
        const daysToFirstMonday = (8 - firstDayOfYear.getDay() + 7) % 7;
        const firstMonday = new Date(year, 0, 1 + daysToFirstMonday);

        const startDate = new Date(firstMonday);
        startDate.setDate(firstMonday.getDate() + (weekNum - 1) * 7);

        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 4);

        const startDay = startDate.getDate().toString().padStart(2, '0');
        const endDay = endDate.getDate().toString().padStart(2, '0');
        const month = endDate.toLocaleString('pt-BR', { month: 'long' });

        return `${startDay} a ${endDay} de ${month} de ${year}`;
    } catch (e) {
        return 'Data inválida';
    }
}

// --- GERAÇÃO DE PDF ---
async function generateSummaryPdf() {
    const loadingModal = document.getElementById('loading-modal');
    const generatePdfButton = document.getElementById('generate-pdf');
    
    loadingModal.classList.remove('hidden');
    generatePdfButton.disabled = true;
    generatePdfButton.classList.add('opacity-50', 'cursor-not-allowed');
    
    try {
        const teacher = document.getElementById('teacher-name').value || 'Não informado';
        const className = document.getElementById('class-name').value || 'Não informada';
        const weekValue = document.getElementById('week-selector').value;
        const ageGroupSelect = document.getElementById('age-group');
        const ageGroupText = ageGroupSelect.value ? ageGroupSelect.options[ageGroupSelect.selectedIndex].text : 'Não informado';
        const weekText = getWeekDateRange(weekValue);
        
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const margin = 15;
        let finalY = margin;
        
        pdf.setFontSize(20);
        pdf.setFont('helvetica', 'bold');
        pdf.text('Planejamento Semanal', pdfWidth / 2, finalY, { align: 'center' });
        finalY += 15;

        pdf.autoTable({
            startY: finalY,
            body: [
                { label: 'Professor(a):', value: teacher },
                { label: 'Turma:', value: className },
                { label: 'Ciclo:', value: ageGroupText },
                { label: 'Período:', value: weekText }
            ],
            columns: [
                { header: 'Campo', dataKey: 'label' },
                { header: 'Valor', dataKey: 'value' },
            ],
            theme: 'grid',
            styles: { fontSize: 12, cellPadding: 3, valign: 'middle' },
            headStyles: {
                fillColor: [244, 244, 244],
                textColor: 20,
                fontStyle: 'bold'
            },
            columnStyles: {
                0: { fontStyle: 'bold', fillColor: [244, 244, 244], cellWidth: 40 },
            },
            didParseCell: (data) => {
                // Remove o cabeçalho padrão da tabela de informações
                if (data.section === 'head') {
                    data.cell.styles.fontStyle = 'normal';
                    data.cell.styles.fillColor = [255, 255, 255];
                }
            }
        });
        
        finalY = pdf.autoTable.previous.finalY;

        for (const day of weekDays) {
            const dayId = day.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace('-feira', '');
            const objectiveRows = document.querySelectorAll(`#objectives-container-${dayId} .objective-row`);
            const objectivesData = [];
            const skillsData = [];

            objectiveRows.forEach(row => {
                const objectiveSelect = row.querySelector('.objective-select');
                const skillSelect = row.querySelector('.skill-select');
                if (objectiveSelect.value && skillSelect.value) {
                    const fieldSelect = row.querySelector('.field-select');
                    const objectiveText = objectiveSelect.options[objectiveSelect.selectedIndex].title;
                    objectivesData.push({ field: fieldSelect.options[fieldSelect.selectedIndex].text, text: `${objectiveSelect.value} - ${objectiveText}` });
                    skillsData.push(skillSelect.value);
                }
            });

            const uniqueObjectives = [...new Map(objectivesData.map(item => [item.text, item])).values()];
            const activities = document.getElementById(`activities_${dayId}`).value;
            const observations = document.getElementById(`observations_${dayId}`).value;
            const specClasses = Array.from(document.querySelectorAll(`#day_${dayId} input[name^="spec_class_"]:checked`)).map(cb => cb.id.split('_')[0].charAt(0).toUpperCase() + cb.id.split('_')[0].slice(1));

            if (uniqueObjectives.length === 0 && skillsData.length === 0 && !activities && specClasses.length === 0 && !observations) continue;

            const dayTableBody = [];
            if (uniqueObjectives.length > 0) {
                const objectivesText = uniqueObjectives.map(o => `${o.field && o.field !== "Selecione um Campo de Experiência" ? `${o.field}: ` : ''}${o.text}`).join('\n\n');
                dayTableBody.push([{ content: 'Objetivos', styles: { fontStyle: 'bold' } }, objectivesText]);
            }
            if (skillsData.length > 0) {
                 dayTableBody.push([{ content: 'Habilidades', styles: { fontStyle: 'bold' } }, skillsData.join('\n')]);
            }
            if (activities) {
                dayTableBody.push([{ content: 'Atividades Propostas', styles: { fontStyle: 'bold' } }, activities]);
            }
             if (specClasses.length > 0) {
                dayTableBody.push([{ content: 'Especialistas', styles: { fontStyle: 'bold' } }, specClasses.join(', ')]);
            }
            if (observations) {
                dayTableBody.push([{ content: 'Observações', styles: { fontStyle: 'bold' } }, observations]);
            }

            pdf.autoTable({
                head: [[{ content: day, colSpan: 2, styles: { halign: 'center', fillColor: [3, 105, 161], textColor: 255, fontSize: 15 } }]],
                body: dayTableBody,
                startY: finalY + 10,
                theme: 'grid',
                styles: { fontSize: 11, cellPadding: 3, valign: 'top' },
                columnStyles: { 0: { cellWidth: 45, fontStyle: 'bold' } },
            });
            finalY = pdf.autoTable.previous.finalY;
        }

        pdf.save(`resumo-planejamento-${className.replace(/\s/g, '_')}.pdf`);
    
    } catch (error) {
        console.error("Erro ao gerar o PDF:", error);
        alert("Ocorreu um erro ao tentar gerar o PDF. Verifique o console para mais detalhes.");
    } finally {
        loadingModal.classList.add('hidden');
        generatePdfButton.disabled = false;
        generatePdfButton.classList.remove('opacity-50', 'cursor-not-allowed');
    }
}

// Adiciona o listener para o evento de 'DOMContentLoaded', que espera o HTML ser carregado
document.addEventListener('DOMContentLoaded', initializeApp);