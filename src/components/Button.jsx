import { Link } from 'react-router-dom';
import Icon from './Icon.jsx';

export default function Button({ to, href, variant = 'gold', icon, children, className = '', ...rest }) {
  const cls = `btn btn--${variant} ${className}`.trim();
  const inner = (
    <>
      {icon === 'phone' && <Icon name="phone" size={20} />}
      <span>{children}</span>
      {icon === 'arrow' && <Icon name="arrow" size={20} />}
    </>
  );
  if (href) return <a className={cls} href={href} {...rest}>{inner}</a>;
  return <Link className={cls} to={to} {...rest}>{inner}</Link>;
}
