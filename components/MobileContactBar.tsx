import type { Messages } from '@/i18n/getMessages';
import { ChannelIcon } from './icons';

const labelStyle: React.CSSProperties = { fontSize: 10, letterSpacing: '.04em' };

/** Sticky bar shown below 640px, mirroring the drawer's direct-contact row. */
export default function MobileContactBar({ channels }: { channels: Messages['contactChannels'] }) {
  return (
    <div className="botbar">
      {channels.map((c) => (
        <a key={c.key} href={c.href}>
          <ChannelIcon name={c.key} size={21} stroke="#EDEBE4" />
          <span className="mono" style={labelStyle}>
            {c.label}
          </span>
        </a>
      ))}
    </div>
  );
}
