import extenso from '../../utils/getNumberFull'
import { formattedValue } from '../../utils/utils'

// Styles
import styles from './styles'

const mockData = [
  {
    id: 1,
    name: "João Silva",
    month_value: 1500,
    description: "Prestação de serviço",
    descriptionSecond: "Mensalidade de consultoria",
    date: "23/12/2024"
  },
  {
    id: 2,
    name: "Maria Oliveira",
    month_value: 1200,
    description: "Venda de produtos",
    descriptionSecond: "Compra de mercadorias",
    date: "23/12/2024"
  },
  {
    id: 3,
    name: "Carlos Souza",
    month_value: 800,
    description: "Honorários",
    descriptionSecond: "Serviço de assessoria jurídica",
    date: "23/12/2024"
  },
  {
    id: 4,
    name: "Ana Costa",
    month_value: 2200,
    description: "Aluguel comercial",
    descriptionSecond: "Locação de imóvel",
    date: "23/12/2024"
  },
  {
    id: 5,
    name: "Pedro Lima",
    month_value: 1750,
    description: "Serviço de manutenção",
    descriptionSecond: "Reparo de equipamentos",
    date: "23/12/2024"
  }
];

export function generateTemplateReceipt() {
  const defaultValue = "------------------------------------#-----------------------------------------"
  const description = 'Transporte Particular'
  const descriptionSecond = ''
  let html = `
    <html>
      <head>
        <style>
          ${styles}
        </style>
      </head>
      <body>
  `

  mockData.map((user, index) => {
    html += `
      <div class='main'>
        <div class='recibo'>
          <div class="area-recibo" key="${user.id}">
            <div class="area-recibo-cabe">
              <div class="text-title">RECIBO:</div>
              <div class="N">
                  <label>N°</label>
                  <input type="text" value="${user.id}" readOnly class=" number browser-default" />
              </div>
              <div class="valorN">
                  <label>VALOR:</label>
                  <input type="text" value="${formattedValue(user.month_value)}" readOnly class="browser-default" />
              </div>
            </div>
            <div class="area-recibo-corpo">
              <div class="area-1">
                  <label>Recebi(emos) de</label>
                  <input type="text" value="${user.name}" readOnly class="browser-default" />
              </div>
              <div class="area-2">
                  <label>a quantia de</label>
                  <input type="text" value="${parseInt(user.month_value).toString().extenso()} Reais ${defaultValue}" readOnly class="browser-default" />
              </div>
              <div class="area-hidden-1">
                  <div class="linha"></div>
              </div>
              <div class="area-3">
                  <label>Referente á</label>
                  <input type="text" readOnly value="${description} ${defaultValue}" class="browser-default" />
              </div>
              <div class="area-hidden-2">
                  <input type="text" readOnly class="browser-default" value="${descriptionSecond} ${defaultValue}" />
                  <br />
                  <label>e para a clareza firmo(amos) o presente.</label>
              </div>
              <div class="area-4">
                  <input class="input-1 browser-default" readOnly type="text" value="jaraguá do sul" />
                  <label>,</label>
                  <input class="input-2 browser-default" readOnly type="text" value={date.slice(0, 2)} />
                  <label>de</label>
                  <input class="input-3 browser-default" readOnly type="text" value={date.slice(3, 5)} />
                  <label>de</label>
                  <input class="input-4 browser-default" readOnly type="text" value={date.slice(6, 10)} />
              </div>
              <div class="area-5">
                  <label>Assinatura</label>
                  <input type="text" readOnly class="browser-default" />
              </div>
              <div class="area-6">
                  <label>Emitente</label>
                  <input type="text" readOnly class="browser-default" />
              </div>
              <div class="area-7">
                  <label>CPF</label>
                  <input type="text" readOnly class="browser-default" />
                  <label>RG</label>
                  <input type="text" readOnly class="browser-default" />
              </div>
            </div>
        </div>
      </div>
    `
  })
  
  html += `</body></html>`

  return html;
}