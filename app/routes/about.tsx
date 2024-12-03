import {MetaFunction} from '@remix-run/react';

export const meta: MetaFunction = () => {
  return [{title: 'About Us'}];
};

export default function AboutPage() {
  return (
    <div className={'about-container'}>
      <h1>Kurashi Soundsystem</h1>
    </div>
  );
}