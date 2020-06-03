import React, {Component} from "react";
import "./Balloon.css"

class Balloon extends Component{
    constructor(props) {
        super(props);
        this.state = {
            colors: null
        }
        this.setColors = this.setColors.bind(this);
        this.createColors = this.createColors.bind(this);
        this.colors = ["#FDD5B1","#1A4876","#1DACD6","#EFDECD","#000000","#00B9FB","#4CB7A5","#1F75FE","#D68A59","#B4674D","#DD9475","#FD7C6E","#828E84","#CCFF00","#50C878","#F78FA7","#A7825D","#FFB653","#3D9979","#95918C","#1CAC78","#FF1DCE","#FFBCD9","#FF496C","#8EE53F","#FFFF66","#CD4A4C","#FF6E4A","#FF7538","#6F9940","#D998A0","#FFAACC","#8E4585","#DD4492","#FF7518","#CA3767","#EE204D","#FDD9B5","#9FE2BF","#704214","#B05C52","#FAA76C","#DEAA88","#17857B","#9B7653","#CDA4DE","#00C5CD","#9D81BA","#926EAE","#E6A8D7","#FCE883"]
    }

    componentDidMount() {
        var groups = [["ble","ble.s","ble.un","ble.un.s","blt","blt.s","blt.un.s","bne.un","bne.un.s","br","br.s"],["ja","jb","jbe","jecxz","jg","jge","jl","jle","jmp","jnb","jno","jnp","jns","jnz","jo","jp","js","jz"],["cmp","cmpsb","cmpsd","cmpxchg","cmpxchg8b","comisd","comiss","switch"],["aaa","aad","aam","aas","adc","add","add.ovf","addpd","addps","addsd","adds","and","andnps","andpd","andps"],["div","divsd","divss"],["fdiv","fdivp","fdivr","fdivrp"],["fsub","fsubp","fsubr","fsubrp"],["fimul"],["sub","sub.ovf","subpd","subps","subsd","subss","idiv","imul"],["fcom","fcomi","fcomip","fcomp","fcompp","fucom","fucomi","fucomip","fucomp","fucompp"],["pand","test","pandn","pxor","xor","xorpd","xorps","xor","xorpd","xorps"],["mul","mul.ovf.un","mulpd","mulps","mulsd","mulss","neg","sbb","fmul","not","or","orps","vmulpd","vmulps","vmulsd","vmulss"],["mov","mov","movapd","mov","movaps","mov","movd","movdqa","movdqu","movhlps","movhpd","movhps","movlhps","movlpd","movlps","movq","movsb","movsd","movss","movsw","movsx","movupd","movups","movzx","vmovaps","vmovd","vmovdqa","vmovdqu","vmovmskps","vmovq","vmovsd","vmovss","vmovupd","vmovups"],["push","pusha","pushf"],["ldarg.0","ldarg.1","ldarg.2","ldarg.3","ldarg.s","ldarga.s","ldc.i4","ldc.i4.0","ldc.i4.1","ldc.i4.2","ldc.i4.3","ldc.i4.4","ldc.i4.5","ldc.i4.6","ldc.i4.7","ldc.i4.8","ldc.i4.m1","ldc.i4.s","ldc.i8","ldc.r4","ldc.r8","ldelem","ldelem.i4","ldelem.i8","ldelem.r4","ldelem.ref","ldelem.u1","ldelem.u2","ldelem.u4","ldelema","ldfld","ldflda","ldftn","ldind.i1","ldind.i2","ldind.i4","ldind.i8","ldind.r4","ldind.r8","ldind.ref","ldind.u1","ldind.u2","ldind.u4","ldlen","ldloc","ldloc.0","ldloc.1","ldloc.2","ldloc.3","ldloc.s","ldloca","ldloca.s","ldnull","ldobj","lds","ldsfld","ldsflda","ldstr","ldtoken","ldvirtftn","ceq","cgt","localloc","pop","popa","popf","fild","fldz","rem"],["maxps","maxsd","maxss","minps","minsd","minss","ret","retn","retf"],["packssdw","packuswb","paddb","paddd","paddsw","paddusw","paddw","pmaddubsw","pmaddwd","pmaxsw","pminsw","pmullw","psadbw","pshufb","pshufd","pshuflw","pshufw","pslld","psllq","psllw","psrad","psraw","psrld","psrldq","psrlq","psrlw","psubb","psubd","psubusb","psubw","punpckhbw","punpckhdq","punpckhwd","punpcklbw","punpckldq","punpcklqdq","punpcklwd","unpcklpd","unpcklps","vaddpd","vaddps","vaddsd","vaddss","vandpd","vandps","daa","das"],["setalc","setb","setbe","setl","setle","setnb","setnbe","setnl","setnle","setns","setnz","seto","sets","setz","stc","std","stelem","stelem.i1","stelem.i2","stelem.i4","stelem.i8","stelem.r4","stelem.ref","stfld","sti","stind.i","stind.i1","stind.i2","stind.i4","stind.i8","stind.r4","stind.r8","stind.ref","stloc","stloc.0","stloc.1","stloc.2","stloc.3","stloc.s","stobj","stosb","stosd","stosw","stsfld"],["call","calli","callvirt"],["cmova","cmovb","cmovbe","cmovg","cmovge","cmovl","cmovle","cmovnb","cmovns","cmovnz","cmovs","cmovz"],["cvtdq2pd","cvtdq2ps","cvtpd2ps","cvtps2dq","cvtps2pd","cvtsd2ss","cvtsi2sd","cvtsi2ss","cvtss2sd","cvttsd2si","cvttss2si"],["arpl","bound","box","brfalse","brfalse.s","brtrue","brtrue.s","bsf","bsr","bswap","bt","btr","bts","castclass","cdq","cgt.un"],["clc","cld","cli","clt","cmc"],["constrained","conv.i","conv.i2","conv.i4","conv.i8","conv.ovf.i2.un","conv.ovf.u2.un","conv.r4","conv.r8","conv.u","conv.u1","conv.u2","conv.u4","conv.u8"],["cpblk","cupid","cpuid","cwde"],["daa","das","dec","dup","emms"],["endfilter","endfinally"],["enter","fabs"],["fadd","faddp","fiadd"],["fchs","fclex","fistp"],["fld1","fldcw","fmulp"],["fnstcw","fnstsw","fstsw"],["fsqrt","fst"],["fstp","fxch","hlt","icebp","inc","initobj","insb","insd","neg","newarr","newobj","nop"],["int","into","rethrow","iret"],["isinst","kmovw","lahf"],["lea","leave","leave.s","les","lfence","here"],["lodsb","lodsd"],["loop","loope","loopne"],["in","out","outsb","outsd"],["rcl","rcr","rol","ror","sahf","sal","sar"],["scasb","scads","sfence"],["shl","shld","shr","shr.un","shrd"],["shufps","sizeof","starg.s","tail","throw"],["ucomisd","ucomiss","ud2","unbox.any","vbroadcastss","vextractf128"],["vfmadd213pd","vfmadd213ps","vinsertf128","volatile","vorps","vpaddd","vpaddw","vpand","vpcmpgtd","vpor","vpshufd","vpsrlq","vpsubd","vpxor","vshufps","vsubpd","vsubps","vxorps"],["vzeroupper","wait","xadd","xchg","xlat"]]
        var mnemonics = this.props.mnemonics;
        this.setState({colors: this.setColors(mnemonics, groups)});
    }

    setColors(arrayMnemonics, arrayGroups) {
        var colors = [];
        colors.length = arrayMnemonics.length;
        for(var i = 0; i < arrayMnemonics.length; ++i) {
            var assigned = false;
            for(var j = 0; j < arrayGroups.length; ++j) {
                for(var k = 0; k < arrayGroups[j].length; ++k) {
                    if(arrayMnemonics[i].split(",")[0] == arrayGroups[j][k]) {
                        colors[i] = j;
                        assigned = true;
                        break;
                    }
                }
            }
            if(!assigned) {
                colors[i] = -1;
            }
        }
        return colors;
    }

    createColors() {
        let list = [];
        var step = 255 / 47; //47 - number of groups
        for(var i = 0; i < this.state.colors.length; ++i) {
            if(this.state.colors[i] == -1) {
                list.push(
                    <th style={{backgroundColor: this.colors[50]}}>.</th>
                );
                continue;
            }
            list.push(
            <th style={{backgroundColor: this.colors[i]}}>.</th>
            );
        }
        return list;
    }

    render() {
        return(
            <div>
                {
                    this.state.colors == null 
                    ? 
                    <br/>
                    :
                    this.createColors()
                }
            </div>
        );
    }
}

export default Balloon;