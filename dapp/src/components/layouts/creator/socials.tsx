export interface SocialLinksProps {
  link: string;
  usernameSocial: string;
  icon: React.ReactNode;
}

export default function SocialLinks(props: SocialLinksProps) {
  return (
    <a
      href={props.link}
      target="_blank"
      className="w-full px-4 py-2 flex items-center gap-2 rounded-md bg-primary/5 hover:bg-primary/10 transition-colors"
    >
      {props.icon}
      <span className="text-sm text-gray-600">
        {props.usernameSocial ? `@${props.usernameSocial}` : props.link}
      </span>
    </a>
  );
}
