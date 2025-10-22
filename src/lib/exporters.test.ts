import { buildCSV, buildJSON } from './exporters';

const holidays = [
  { name: 'Confraternização mundial', iso: '2025-01-01', type: 'national' },
  { name: 'Carnaval', iso: '2025-03-04', type: 'national' },
];

test('buildCSV generates correct CSV content', () => {
  const csv = buildCSV(holidays);
  expect(csv.trim()).toBe(
    'name,date,type\n' +
      'Confraternização mundial,2025-01-01,national\n' +
      'Carnaval,2025-03-04,national',
  );
});

test('buildJSON generates correct JSON content', () => {
  const json = buildJSON(holidays);
  expect(JSON.parse(json)).toEqual([
    { name: 'Confraternização mundial', date: '2025-01-01', type: 'national' },
    { name: 'Carnaval', date: '2025-03-04', type: 'national' },
  ]);
});
