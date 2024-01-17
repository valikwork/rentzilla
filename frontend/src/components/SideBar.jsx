import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useGetAllAdvertsMutation } from '../slices/advertApiSlice';
import { setAdverts } from '../slices/advertsSlice';
import AdvertCard from './AdvertCard';
import Spinner from './svg/Spinner';

export default function SideBar() {

  const adverts = useSelector((state) => state.adverts.adverts);
  const [getAllAdverts, {isLoading}] = useGetAllAdvertsMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllAdverts = async () => {
      try {
        const {adverts} = await getAllAdverts().unwrap();
        dispatch(setAdverts(adverts));
      } catch (err) {
        console.error(err);
      }
    }
    fetchAllAdverts()
  }, [dispatch, getAllAdverts])

  return (
    <section className='h-[calc(100vh-60px)] w-[279px] overflow-y-auto p-4 flex flex-col bg-[#f2f4f5]'>
      <h3 className='font-medium color-rentzilaDark mb-4'>{adverts.length} Adverts found</h3>
      {isLoading && <Spinner />}
      {!isLoading && adverts.length > 0 && (
        <div className='flex flex-col gap-4'>
          {adverts.map(advert => <AdvertCard advert={advert} key={advert['_id']} />)}
        </div>
      )}
    </section>
  )
}
