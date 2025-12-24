import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';
import { OrderProvider } from '../context/OrderContext';
import { MemoryRouter } from 'react-router-dom';

const customRender = (ui) =>
  render(
    <OrderProvider>
      <MemoryRouter initialEntries={['/']}>
        {ui}
      </MemoryRouter>
    </OrderProvider>
  );

test('renders order list page and checks for initial orders', () => {
  customRender(<App />);
  expect(screen.getByText(/order list/i)).toBeInTheDocument();
});

test('adds new order and checks if it appears in the list', async () => {
  customRender(<App />);

  fireEvent.click(screen.getByText(/add order/i));

  fireEvent.change(screen.getByPlaceholderText(/product name/i), {
    target: { value: 'New Order' }
  });
  fireEvent.change(screen.getByPlaceholderText(/quantity/i), {
    target: { value: '5' }
  });

  fireEvent.click(screen.getByText(/submit/i));

  await waitFor(() => {
    expect(screen.getByText('New Order')).toBeInTheDocument();
  });
});

test('displays correct details for an order when clicked', async () => {
  customRender(<App />);

  fireEvent.click(screen.getByText(/add order/i));
  fireEvent.change(screen.getByPlaceholderText(/product name/i), {
    target: { value: 'Order 1' }
  });
  fireEvent.change(screen.getByPlaceholderText(/quantity/i), {
    target: { value: '10' }
  });
  fireEvent.click(screen.getByText(/submit/i));

  fireEvent.click(await screen.findByText('Order 1'));

  expect(screen.getByText('Order 1')).toBeInTheDocument();
  expect(screen.getByText('Quantity: 10')).toBeInTheDocument();
});

test('increases quantity correctly in order status', async () => {
  customRender(<App />);

  fireEvent.click(screen.getByText(/add order/i));
  fireEvent.change(screen.getByPlaceholderText(/product name/i), {
    target: { value: 'Order 2' }
  });
  fireEvent.change(screen.getByPlaceholderText(/quantity/i), {
    target: { value: '5' }
  });
  fireEvent.click(screen.getByText(/submit/i));

  fireEvent.click(await screen.findByText('Order 2'));
  fireEvent.click(screen.getByText(/update order status/i));

  fireEvent.click(screen.getByText('+'));

  expect(screen.getByText('Current Quantity: 6')).toBeInTheDocument();
});

test('decreases quantity correctly in order status', async () => {
  customRender(<App />);

  fireEvent.click(screen.getByText(/add order/i));
  fireEvent.change(screen.getByPlaceholderText(/product name/i), {
    target: { value: 'Order 3' }
  });
  fireEvent.change(screen.getByPlaceholderText(/quantity/i), {
    target: { value: '5' }
  });
  fireEvent.click(screen.getByText(/submit/i));

  fireEvent.click(await screen.findByText('Order 3'));
  fireEvent.click(screen.getByText(/update order status/i));

  fireEvent.click(screen.getByText('-'));

  expect(screen.getByText('Current Quantity: 4')).toBeInTheDocument();
});

test('renders Order not found if order does not exist in OrderDetails', () => {
  customRender(<App />);

  fireEvent.click(screen.getByText('Non-existent Order'));

  expect(screen.getByText(/order not found!/i)).toBeInTheDocument();
});

test('displays the correct text on order list page', () => {
  customRender(<App />);
  expect(screen.getByText('Order List')).toBeInTheDocument();
});

test('displays the correct text on Add Order page', () => {
  customRender(<App />);

  fireEvent.click(screen.getByText(/add order/i));

  expect(screen.getByPlaceholderText(/product name/i)).toBeInTheDocument();
  expect(screen.getByText(/submit/i)).toBeInTheDocument();
});

test('checks if Back to Order button works in Order Status page', async () => {
  customRender(<App />);

  fireEvent.click(screen.getByText(/add order/i));
  fireEvent.change(screen.getByPlaceholderText(/product name/i), {
    target: { value: 'Order 4' }
  });
  fireEvent.change(screen.getByPlaceholderText(/quantity/i), {
    target: { value: '20' }
  });
  fireEvent.click(screen.getByText(/submit/i));

  fireEvent.click(await screen.findByText('Order 4'));
  fireEvent.click(screen.getByText(/update order status/i));
  fireEvent.click(screen.getByText(/back to order/i));

  expect(screen.getByText('Order 4')).toBeInTheDocument();
});

test('checks if Add Order button is working after adding an order', async () => {
  customRender(<App />);

  fireEvent.click(screen.getByText(/add order/i));
  fireEvent.change(screen.getByPlaceholderText(/product name/i), {
    target: { value: 'Order 5' }
  });
  fireEvent.change(screen.getByPlaceholderText(/quantity/i), {
    target: { value: '30' }
  });
  fireEvent.click(screen.getByText(/submit/i));

  await waitFor(() => {
    expect(screen.getByText('Order 5')).toBeInTheDocument();
  });
});
