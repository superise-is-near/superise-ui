import React from "react";
import { toRealSymbol } from "~/src/utils/token";
import { TokenMetadata } from "~/src/domain/near/ft/models";
import { ArrowDownBlack } from "~/src/components/icons";

interface TokenProps {
  token: TokenMetadata;
  onClick: (token: TokenMetadata) => void;
  totalAmount?: string;
  sortBy?: string;
}

export default function Icon({
  className = "",
  token,
  label = true,
  size = 6,
}: {
  className?: string;
  token: TokenMetadata;
  label?: boolean;
  size?: number | string;
}) {
  return (
    <div className="flex items-center text-lg" style={{ lineHeight: "unset" }}>
      {label && <p className="block text-sm">{toRealSymbol(token.symbol)}</p>}
      <div className="pl-2 xs:pl-1 text-xs">
        <ArrowDownBlack />
      </div>
      <img
        key={token.id}
        className="ml-2 xs:ml-1 h-9 w-9 xs:h-7 xs:w-7 border rounded-full border-greenLight"
        src={token.icon}
      />
    </div>
  );
}
