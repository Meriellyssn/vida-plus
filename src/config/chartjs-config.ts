/**
 * Configuração Chart.js - Sistema Vida Plus
 *
 * Este arquivo é responsável por registrar os elementos e plugins
 * utilizados pelos gráficos do Chart.js em toda a aplicação.
 *
 * Ao centralizar o registro, garantimos que os componentes que
 * utilizam gráficos (Line, Doughnut, etc.) funcionem corretamente
 * sem a necessidade de repetir configurações em cada uso.
 *
 * Elementos registrados:
 * - CategoryScale e LinearScale: Escalas para eixos.
 * - PointElement e LineElement: Gráficos de linhas.
 * - Title, Tooltip e Legend: Plugins para título, dicas e legenda.
 * - ArcElement: Necessário para gráficos de pizza/doughnut.
 *
 * @author Meirielli S. Sousa do N.
 * @version 1.0.0
 * @since 2025
 */

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement, // Necessário para gráficos de doughnut/pizza
} from 'chart.js';

// Registro global dos elementos e plugins
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);
