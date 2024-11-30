import { render, screen, fireEvent } from '@testing-library/react';
import CharactersPage from '../page';
import { useFetch } from '@/hooks/useFetch';

jest.mock('@/hooks/useFetch', () => ({
  useFetch: jest.fn(),
}));

describe('CharactersPage Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the loading state', async () => {
    (useFetch as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    render(<CharactersPage />);

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('renders an error message when fetching fails', async () => {
    (useFetch as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: new Error('Failed to fetch data'),
    });

    render(<CharactersPage />);

    expect(screen.getByText(/error: failed to fetch data/i)).toBeInTheDocument();
  });

  it('renders character data when fetch succeeds', async () => {
    (useFetch as jest.Mock).mockReturnValue({
      data: {
        results: [
          { name: 'Luke Skywalker', url: 'https://swapi.dev/api/people/1/' },
          { name: 'Darth Vader', url: 'https://swapi.dev/api/people/4/' },
        ],
        count: 2,
      },
      isLoading: false,
      error: null,
    });

    render(<CharactersPage />);

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('Darth Vader')).toBeInTheDocument();
  });

  it('triggers pagination and search events', async () => {
    (useFetch as jest.Mock).mockReturnValue({
      data: {
        results: [
          { name: 'Luke Skywalker', url: 'https://swapi.dev/api/people/1/' },
        ],
        count: 20,
      },
      isLoading: false,
      error: null,
    });

    render(<CharactersPage />);

    // Search Input
    const searchInput = screen.getByTestId('searchbar');
    fireEvent.change(searchInput, { target: { value: 'Darth' } });
    expect(searchInput).toHaveValue('Darth');

    // Pagination
    const nextPageButton = screen.getByRole('button', { name: /next/i });
    fireEvent.click(nextPageButton);
    expect(nextPageButton).toBeInTheDocument();
  });
});
