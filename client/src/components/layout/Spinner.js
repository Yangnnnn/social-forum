import spinner from './Spinner.gif';

export default () => {
  return (
    <>
      <img
        src={spinner}
        style={{ width: '200px', margin: 'auto', display: 'block' }}
        alt='Loading...'
      ></img>
    </>
  );
};
