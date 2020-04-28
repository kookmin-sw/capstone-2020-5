import idaapi
import os
import pickle

idaapi.autoWait()

save_path = idc.ARGV[1]
file_name = idc.ARGV[2]

ops_list = list()
mnem_list = list()

# IDA Pro analysis
for seg_ea in Segments():
    for func_ea in Functions(seg_ea, SegEnd(seg_ea)):  # function
        f = idaapi.get_func(func_ea)
        func_opcode = list()
        func_mnem = list()
        for block in idaapi.FlowChart(f):  # basic block
            bb_opcode = list()
            bb_mnem = list()
            for head in Heads(block.startEA, block.endEA):
                text = generate_disasm_line(head, 0)
                if text and isCode(GetFlags(head)):  # opcode
                    mnem = GetMnem(head)
                    op = '%02x'%(Byte(head))
                    bb_opcode.append(op)
                    bb_mnem.append(mnem)
            func_opcode.append(bb_opcode)
            func_mnem.append(bb_mnem)
        ops_list.append(func_opcode)
        mnem_list.append(func_mnem)


if len(ops_list) != 0:
    with open(os.path.join(save_path,'opcode',file_name.split('.')[0]+'.pickle'), 'wb') as f:
        pickle.dump(ops_list,f)
    with open(os.path.join(save_path,'mnemonic',file_name.split('.')[0]+'.pickle'), 'wb') as f:
        pickle.dump(mnem_list,f)
idc.Exit(0)
