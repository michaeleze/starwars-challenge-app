import { render, screen, cleanup, act } from '@testing-library/react';
import CharacterDetail from './page';
import { useFetch } from '@/hooks/useFetch';
import { useParams, usePathname } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useParams: jest.fn(),
  usePathname: jest.fn(),
}));

jest.mock('@/hooks/useFetch');

// Mock cleanup to clear the DOM after each test
afterEach(() => {
  cleanup();
});

describe('CharacterDetail Component', () => {
  let mockUseFetch: jest.Mock;

  beforeEach(() => {
    // Reset mocks and set up default mocks for each test
    mockUseFetch = useFetch as jest.Mock;
    jest.clearAllMocks();

    // Mock useParams to return a specific id
    (useParams as jest.Mock).mockReturnValue({ id: '1' });

    // Mock usePathname to return a valid path
    (usePathname as jest.Mock).mockReturnValue('/characters/1');
  });

  it('renders loading state initially', async () => {
    // Mock useFetch to return loading state
    mockUseFetch.mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    await act(async () => {
      render(<CharacterDetail />);
    });

    // Assert that the loading spinner is visible
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders character details correctly', async () => {
    // Mock useFetch to return character data
    mockUseFetch.mockReturnValue({
      data: {
        name: 'Luke Skywalker',
        height: '172',
        mass: '77',
        hair_color: 'Blond',
        skin_color: 'Fair',
        eye_color: 'Blue',
        birth_year: '19BBY',
        gender: 'Male',
        homeworld: 'Tatooine',
        films: ['A New Hope', 'The Empire Strikes Back'],
      },
      isLoading: false,
      error: null,
    });

    await act(async () => {
      render(<CharacterDetail />);
    });


    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('Blond')).toBeInTheDocument();
  });

  it('renders error state correctly', async () => {
    // Mock useFetch to return an error
    mockUseFetch.mockReturnValue({
      data: null,
      isLoading: false,
      error: new Error('Failed to fetch data'),
    });

    await act(async () => {
      render(<CharacterDetail />);
    });

    expect(screen.getByText('Error: Failed to fetch data')).toBeInTheDocument();
  });
});
