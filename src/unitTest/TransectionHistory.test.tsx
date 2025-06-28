// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import TransectionHistory from '../screens/transection-history';
// import { describe, expect, it, vi } from 'vitest';
// import '@testing-library/jest-dom';

// vi.mock('../library/enum', () => ({
//   OrderStatus: {
//     Completed: 'Completed',
//     Cancelled: 'Cancelled',
//   },
//   TransectionStatus: {
//     BUY: 'BUY',
//     SELL: 'SELL',
//   },
// }));

// vi.mock('../library/helper', () => ({
//   formatDateToDMY: (date: string) => `Formatted-${date}`,
// }));

// // Mock Search component (optional)
// vi.mock('antd/es/input/Search', async () => {
//   const mod = (await vi.importActual('antd')) as typeof import('antd');
//   return { default: mod.Input.Search };
// });

// // Sample data
// const mockTransectionData = [
//   {
//     id: '1',
//     id_security_detail: 1,
//     order_ref_no: 'REF001',
//     symbol: 'AAPL',
//     amount: 1000,
//     transaction_type: 'BUY',
//     order_status: 'Completed',
//     order_value: 1100,
//     created_on: '2024-01-01',
//     created_by: 1,
//   },
//   {
//     id: '2',
//     id_security_detail: 2,
//     order_ref_no: 'REF002',
//     symbol: 'TSLA',
//     amount: 2000,
//     transaction_type: 'SELL',
//     order_status: 'Cancelled',
//     order_value: 2100,
//     created_on: '2024-02-01',
//     created_by: 2,
//   },
// ];

// // Mock the custom hook
// vi.mock('../hooks/useTransectionHistory', () => ({
//   default: () => ({
//     transectionData: mockTransectionData,
//     searchTransactions: (query: string) =>
//       mockTransectionData.filter((item) =>
//         item.symbol.toLowerCase().includes(query.toLowerCase())
//       ),
//   }),
// }));

// describe('<TransectionHistory />', () => {
//   //   it('renders table with all rows by default', () => {
//   //     render(<TransectionHistory />);
//   //     // Check both rows render initially
//   //     expect(screen.getByText('REF001')).toBeInTheDocument();
//   //     expect(screen.getByText('REF002')).toBeInTheDocument();
//   //     expect(screen.getByText('AAPL')).toBeInTheDocument();
//   //     expect(screen.getByText('TSLA')).toBeInTheDocument();
//   //   });
//   //   it('filters table based on search input', async () => {
//   //     render(<TransectionHistory />);
//   //     const input = screen.getByPlaceholderText(/search by symbol/i);
//   //     // Type 'AAP' into input
//   //     fireEvent.change(input, { target: { value: 'AAP' } });
//   //     await waitFor(() => {
//   //       expect(screen.getByText('REF001')).toBeInTheDocument();
//   //       expect(screen.queryByText('REF002')).not.toBeInTheDocument();
//   //     });
//   //   });
//   //   it('resets table when input is cleared', async () => {
//   //     render(<TransectionHistory />);
//   //     const input = screen.getByPlaceholderText(/search by symbol/i);
//   //     // Search something
//   //     fireEvent.change(input, { target: { value: 'AAP' } });
//   //     await waitFor(() => {
//   //       expect(screen.queryByText('REF002')).not.toBeInTheDocument();
//   //     });
//   //     // Clear search
//   //     fireEvent.change(input, { target: { value: '' } });
//   //     await waitFor(() => {
//   //       expect(screen.getByText('REF001')).toBeInTheDocument();
//   //       expect(screen.getByText('REF002')).toBeInTheDocument();
//   //     });
//   //   });
//   it('renders all table column headers correctly', () => {
//     render(<TransectionHistory />);
//     const expectedHeaders = [
//       'Order Reference',
//       'Stock Name',
//       'Amount',
//       'Transection Type',
//       'Status',
//       'Ordered Value',
//       'Ordered Date',
//     ];
//     expectedHeaders.forEach((header) => {
//       expect(screen.getByText(header)).toBeInTheDocument();
//     });
//   });
// });

import { render, screen } from '@testing-library/react';
import TransectionHistory from '../screens/transection-history';
import { describe, it, vi, expect } from 'vitest';
import '@testing-library/jest-dom';

// Sample data to render
const mockTransectionData = [
  {
    id: '1',
    id_security_detail: 1,
    order_ref_no: 'REF001',
    symbol: 'AAPL',
    amount: 1000,
    transaction_type: 'BUY',
    order_status: 'Completed',
    order_value: 1100,
    created_on: '2024-01-01',
    created_by: 1,
  },
];

// Mocks
vi.mock('../hooks/useTransectionHistory', () => ({
  default: () => ({
    transectionData: mockTransectionData,
    searchTransactions: () => mockTransectionData,
  }),
}));

vi.mock('../library/enum', () => ({
  OrderStatus: {
    Completed: 'Completed',
    Cancelled: 'Cancelled',
  },
  TransectionStatus: {
    BUY: 'BUY',
    SELL: 'SELL',
  },
}));

vi.mock('../library/helper', () => ({
  formatDateToDMY: (date: string) => `Formatted-${date}`,
}));

vi.mock('antd/es/input/Search', () => ({
  __esModule: true,
  default: (props: any) => (
    <input
      placeholder={props.placeholder}
      onChange={(e) => props.onChange?.(e)}
      onKeyDown={(e) =>
        e.key === 'Enter' &&
        props.onSearch?.((e.target as HTMLInputElement).value)
      }
    />
  ),
}));

describe('<TransectionHistory />', () => {
  it('renders all expected column headers', async () => {
    render(<TransectionHistory />);

    const columnHeaders = [
      'Order Reference',
      'Stock Name',
      'Amount',
      'Transection Type',
      'Status',
      'Ordered Value',
      'Ordered Date',
    ];

    columnHeaders.forEach((header) => {
      expect(screen.getByText(header)).toBeInTheDocument();
    });
  });
});
