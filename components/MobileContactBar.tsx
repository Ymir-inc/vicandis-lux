import type { Messages } from '@/i18n/getMessages';
import { ChannelIcon } from './icons';

const labelStyle: React.CSSProperties = { fontSize: 10, letterSpacing: '.04em' };

/**
 * Sticky bar shown below 640px, mirroring the drawer's direct-contact row.
 *
 * Every channel hands off to an app — `tel:`, `viber://`, `wa.me` — so the links
 * stay in the current tab: the browser passes the intent to the OS and the site
 * is still underneath when the visitor comes back. `target="_blank"` would leave
 * a blank tab stranded on the phones this bar exists for.
 */
export default function MobileContactBar({ channels }: { channels: Messages['contactChannels'] }) {
  return (
    <div className="botbar">
      {channels.map((c) => (
        <a key={c.key} href={c.href}>
          <ChannelIcon name={c.key} size={21} stroke="#F7F5F0" />
          <span className="mono" style={labelStyle}>
            {c.label}
          </span>
        </a>
      ))}
    </div>
  );
}
