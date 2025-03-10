interface SkillCardProps {
  name: string;
  icon: string;
}

export function SkillCard({ name, icon }: SkillCardProps) {
  return (
    <div className="bg-light p-4 rounded-lg">
      <div className="flex items-center">
        <div className="w-10 h-10 flex items-center justify-center bg-primary/10 rounded-lg text-primary mr-3">
          <span dangerouslySetInnerHTML={{ __html: icon }} />
        </div>
        <span className="font-medium">{name}</span>
      </div>
    </div>
  );
}
