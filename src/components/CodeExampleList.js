import React, { memo } from 'react';
import cn from 'classnames';

import Image from './Image';

import * as css from './CodeExampleList.module.css';

import NodeIcon from '../images/node-icon.svg';
import P5Icon from '../images/p5js-icon.svg';
import ProcessingLogo from '../images/processing-icon.svg';

const icons = {
  p5: () => <P5Icon className={css.p5} />,
  node: () => <NodeIcon className={css.node} />,
  processing: () => <ProcessingLogo className={css.processing} />
};

const linkProps = {
  title: 'Open code source',
  target: '_blank',
  rel: 'noreferrer'
};

const useUrls = (urls) => {
  const mainUrl = urls.p5 ?? urls.processing ?? urls.node ?? urls.other;
  const components = [];
  for (const url in urls) {
    if (url !== 'other' && urls[url]) {
      const Icon = icons[url];
      components.push(
        <span className={css.icon} key={url}>
          <a {...linkProps} title={`Open ${url} source code`} href={urls[url]}>
            <Icon />
          </a>
        </span>
      );
    }
  }
  if (urls.other) {
    const downloadUrl = urls.other.includes('github.com/')
      ? `https://minhaskamal.github.io/DownGit/#/home?url=${urls.other}`
      : null;

    components.push(
      <div className={css.links} key="links">
        <a {...linkProps} className={css.linkIcon} href={urls.other}>
          📒
        </a>
        {downloadUrl && (
          <a
            {...linkProps}
            className={css.linkIcon}
            href={downloadUrl}
            title="Download code as zip">
            💾
          </a>
        )}
      </div>
    );
  }

  return [mainUrl, components];
};

const CodeExample = ({ example }) => {
  const { title, description, image } = example;
  const [mainUrl, urls] = useUrls(example.urls);

  return (
    <li className={css.example}>
      <span className={css.thumbnail}>
        <a {...linkProps} href={mainUrl}>
          {image && (
            <Image
              image={image.file.childImageSharp.gatsbyImageData}
              alt={`Thumbnail for ${title} code example`}
            />
          )}
        </a>
      </span>
      <span className={css.info}>
        <a {...linkProps} href={mainUrl}>
          <span className={css.title}> {title}</span>
          {description && (
            <span className={css.description}>{description}</span>
          )}
        </a>
      </span>
      {urls}
    </li>
  );
};

const CodeExampleList = memo(({ className, variant, examples }) => {
  return (
    <ul className={cn(css.root, className, { [css[variant]]: variant })}>
      {examples.map((example, key) => (
        <CodeExample example={example} key={key} />
      ))}
    </ul>
  );
});

export default CodeExampleList;
