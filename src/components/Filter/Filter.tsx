import { useProducts } from 'contexts/products-context';

import * as S from './style';
import { ChangeEvent } from 'react';
import Button from 'react-bootstrap/Button';
export const availableSizes = ['Sadece Stoktakileri Göster'];





const Filter = () => {


  const { filters, filterProducts, filterProductsWord } = useProducts();

  const selectedCheckboxes = new Set(filters);

  const toggleCheckbox = (label: string) => {
    if (selectedCheckboxes.has(label)) {
      selectedCheckboxes.delete(label);
    } else {
      selectedCheckboxes.add(label);
    }

    const filters = Array.from(selectedCheckboxes) as [];

    filterProducts(filters);
  };

  const toggleInput = (label: string) => {
    
    filterProductsWord(label);
  };

  const createCheckbox = (label: string) => (
    <>
    <input placeholder='Ara' type="text" onChange={(e)=>{toggleInput(e.target.value)}} key={label} />

    <br></br>
    <br></br>
      <S.Checkbox label={label} handleOnChange={toggleCheckbox} key={label} />

      
    </>
  );

  const createCheckboxes = () => availableSizes.map(createCheckbox);

  return <S.Container>{createCheckboxes()}</S.Container>;
};

export default Filter;
