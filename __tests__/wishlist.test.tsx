import '@testing-library/jest-dom';
import WishlistPage from '@/app/(main-pages)/wishlist/page';
import { render, screen } from '@testing-library/react';
import { v4 as uuidv4 } from 'uuid';
import { ToolCard } from '@/app/lib/types';


const mockTool = {
  id: uuidv4(),
  name: 'Hammer',
  description: 'Powerful hammering tool for professional use.',
  location: 'Warehouse H',
  dailyRate: 20,
  weeklyRate: 100,
  monthlyRate: 300,
  picture: 'https://as2.ftcdn.net/v2/jpg/01/01/57/15/1000_F_101571591_06UDBxpsfOLocCdhn6tHAyOQgmS4P3GG.jpg',
  liked: true,
  available: true,
  reviews: [],
  ownerId: '04e55ea7-642c-46f3-8e51-3a09edb2ded2',
  toolCategoryId: 'aee5e001-4d1c-489e-92ed-738b098eda2f',
  toolrequests: [],
  wishlists: [],
}

describe('Wishlist', () => {

  describe('When wishlist is empty', () => {
    it('Should display empty wishlist message', () => {
      render(<WishlistPage />);
      expect(screen.getByTestId('empty-wishlist')).toBeInTheDocument();
    });
  });

  describe('When wishlist is created', () => {
    beforeEach(() => {
      global.fetch = jest.fn()
    });

    it('Should display all favorited cards', async () => {
      render(<WishlistPage />);
      console.log('------------', global.fetch);
      const postFetch = await fetch('/api/wishlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(mockTool)
      })
      console.log('postFetch', postFetch)
    });
  });
});
    //   const response: ToolCard[] = await fetch('/api/wishlist').then(
    //     expect(response).toContainElement(mockTool)
    //   );
    //   expect(screen.findByText('Hammer')).toBeInTheDocument();
    // });
  

// describe('When wishlist is created', () => {
//   //   // const fetchMock = jest
//   //   //   .spyOn(global, 'fetch')
//   //   //   .mockImplementation(() =>
//   //   //     Promise.resolve({ json: () => Promise.resolve([/*mockdata here*/]) })
//   //   //   );
    

// );
  
// //add to wihslist
// it('Should display all favorited cards', () => {
//   render(<WishlistPage />);
//   // check if all components are rendered
//   expect(screen.getByTestId('result')).toBeInTheDocument();
// });

//remove  wihslist
// it('Allows user to remove cards from wishlist', () => {
//   render(<WishlistPage />);
//   // check if all components are rendered
//   expect(screen.getByTestId('result')).toBeInTheDocument();
// });

