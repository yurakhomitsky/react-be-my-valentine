import { FC, useState } from 'react';

import './style.css';

const willYouBeMyValentineMessage = 'Будеш моєю валентинкою?';
const afterNoResponse = 'Ну то до біса тебе!!';
const afterYesReponse = 'Yaaay!! ❤️';

const initialImage =
  'https://i.pinimg.com/564x/2a/5a/ad/2a5aadae6d6c1e8f7d5b545349ba804a.jpg';

const noImage =
  'https://i.pinimg.com/564x/6a/7a/3b/6a7a3b608f40fa0238885ebcfef7097c.jpg';

const yesImage =
  'https://i.pinimg.com/564x/87/7a/a5/877aa52b1178d72db22849add15eac6b.jpg';

const sadImages = [
  'https://i.pinimg.com/564x/da/51/42/da5142c48f1258d24928d73b6ca873d3.jpg',
  'https://i.pinimg.com/564x/ca/5e/31/ca5e316185505ac46bfcc57337b2e706.jpg',
  'https://i.pinimg.com/564x/43/a2/76/43a2760e4296a163eac6339e13ab849f.jpg',
  'https://i.pinimg.com/564x/cd/2e/ba/cd2ebab46a83954346eff7fd1109c064.jpg',
  'https://i.pinimg.com/564x/38/a2/96/38a296901422f94b66ee67a15d9543b9.jpg',
  'https://i.pinimg.com/564x/16/ac/0c/16ac0c503f7f2d376db6e4d7cc23b8f9.jpg',
  'https://i.pinimg.com/564x/7b/ce/31/7bce31091527588f51df92ca88f30b39.jpg',
];

const whyNotMessages = [
  'Здається це не так кнопка..',
  'Оуу :(',
  'Справді ні?',
  'Точно?',
  'Мені буде прикро!',
  'Ти розбиваєш мені серце.. :(',
  'Останній шанс...',
];

const initialSize = {
  clickCount: 0,
  padding: null,
  fontSize: null,
};

export const App: FC = () => {
  const [size, setSize] = useState(initialSize);

  const currentImage =
    size.clickCount === 0
      ? initialImage
      : sadImages[Math.min(size.clickCount - 1, sadImages.length - 1)];

  const whyNotMessage =
    whyNotMessages[Math.min(size.clickCount - 1, whyNotMessages.length - 1)];

  const isLastChance = whyNotMessage === whyNotMessages.at(-1);

  const [answer, setAnswer] = useState<'yes' | 'no' | null>(null);

  const no = answer === 'no';
  const yes = answer === 'yes';

  const increaseButtonSize = () => {
    if (isLastChance) {
      setAnswer('no');
      return;
    }

    setSize((prevSize) => {
      const clickCount = prevSize.clickCount + 1;
      const nextSize = {
        clickCount,
        padding: `calc(0.25rem + ${0.25 * clickCount}rem) calc(1rem + ${
          0.25 * clickCount
        }rem)`,
        fontSize: `calc(70% + ${15 * clickCount}%)`,
      };
      return nextSize;
    });
  };

  const saidYes = () => {
    setAnswer('yes');
  };

  const reset = () => {
    setSize(initialSize);
    setAnswer(null);
  };

  return (
    <>
      <header className="bg-pink-800 text-pink-200 header header-fixed header-animated">
        <div className="header-brand">
          <div className="nav-item no-hover">
            <h6 className="title">be my Valentine 💌 </h6>
          </div>
        </div>
      </header>
      <section className="hero bg-orange-100">
        <div className="hero-body">
          <div className="content max-w-sm u-flex u-flex-column u-justify-space-between u-gap-2 u-items-center">
            {!no && !yes && (
              <WillYouBeMyValentine
                currentImage={currentImage}
                onYes={saidYes}
                onNo={increaseButtonSize}
                yesBtnStyle={size}
              >
                {size.clickCount >= 1 && (
                  <p className="u-text-center">{whyNotMessage}</p>
                )}
              </WillYouBeMyValentine>
            )}
            {(no || yes) && <ReponseResult answer={answer} />}
          </div>
        </div>
      </section>
      {(no || yes) && (
        <button
          className="again-btn btn--sm bg-pink-600 u-absolute u-left-0 u-right-0 u-bottom-0 border-pink-600 text-light"
          onClick={reset}
        >
          Try Again
        </button>
      )}
    </>
  );
};

function ReponseResult({ answer }: { answer: 'yes' | 'no' | null }) {
  const getImageAndText = () => {
    switch (answer) {
      case 'yes':
        return { image: yesImage, responseText: afterYesReponse };
      case 'no':
        return { image: noImage, responseText: afterNoResponse };
      default:
        return { image: null, responseText: null };
    }
  };

  const { image, responseText } = getImageAndText();

  return (
    <>
      {image && (
        <img
          className="img-contain max-w-40p mx-auto"
          src={image}
          alt="Response"
        />
      )}
      {responseText && (
        <p className="no-margin bg-light p-1 u-text-center">{responseText}</p>
      )}
    </>
  );
}

function WillYouBeMyValentine({
  currentImage,
  children,
  onYes,
  onNo,
  yesBtnStyle,
}) {
  return (
    <>
      <div className="card no-margin w-80p bg-pink-300 p-2">
        <img className="img-contain max-w-40p mx-auto" src={currentImage} />
        <p className="u-text-center text-lg">{willYouBeMyValentineMessage}</p>
        {children}
      </div>

      <div className="u-flex u-justify-center u-items-flex-start u-gap-5">
        <button
          className="btn--sm bg-pink-600 border-pink-600 text-light"
          onClick={onNo}
        >
          Ні
        </button>
        <button
          style={yesBtnStyle}
          onClick={onYes}
          className="btn--sm bg-pink-600 border-pink-600 text-light"
        >
          Так
        </button>
      </div>
    </>
  );
}
