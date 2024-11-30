import { render, screen, cleanup, act } from '@testing-library/react';
import PlanetDetail from '../page';
import { useParams } from 'next/navigation';
import { useFetch } from '@/hooks/useFetch';

jest.mock('next/navigation', () => ({
  useParams: jest.fn(),
}));

jest.mock('@/hooks/useFetch', () => ({
  useFetch: jest.fn(),
}));

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

describe('PlanetDetail Component', () => {
  beforeEach(() => {
    (useParams as jest.Mock).mockReturnValue({ id: '1' });
  });

  it('renders loading state', async () => {
    (useFetch as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    await act(async () => {
      render(<PlanetDetail />);
    });

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders error state', async () => {
    (useFetch as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: new Error('Failed to fetch planet details'),
    });

    await act(async () => {
      render(<PlanetDetail />);
    });

    expect(screen.getByText('Error: Failed to fetch planet details')).toBeInTheDocument();
  });

  it('renders planet details correctly', async () => {
    (useFetch as jest.Mock).mockReturnValue({
      data: {
        name: 'Tatooine',
        rotation_period: '23',
        orbital_period: '304',
        diameter: '10465',
        climate: 'arid',
        gravity: '1 standard',
        terrain: 'desert',
        surface_water: '1',
        population: '200000',
        films: ['A New Hope', 'The Empire Strikes Back'],
      },
      isLoading: false,
      error: null,
    });

    await act(async () => {
      render(<PlanetDetail />);
    });

    expect(screen.getByText('Tatooine')).toBeInTheDocument();
    expect(screen.getByText('Rotation Period: 23 hours')).toBeInTheDocument();
    expect(screen.getByText('Orbital Period: 304 days')).toBeInTheDocument();
    expect(screen.getByText('Diameter: 10465 km')).toBeInTheDocument();
    expect(screen.getByText('Climate: arid')).toBeInTheDocument();
    expect(screen.getByText('Population: 200000')).toBeInTheDocument();

    expect(screen.getByText('A New Hope')).toBeInTheDocument();
    expect(screen.getByText('The Empire Strikes Back')).toBeInTheDocument();
  });
});
