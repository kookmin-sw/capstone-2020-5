import idaapi
import os
import pickle

idaapi.autoWait()

save_path = r'C:\Users\hyeongy\Desktop\opcode'

ops_list = list()

# IDA Pro analysis
for seg_ea in Segments():
    for func_ea in Functions(seg_ea, SegEnd(seg_ea)):  # function
        f = idaapi.get_func(func_ea)
        func_opcode = list()
        for block in idaapi.FlowChart(f):  # basic block
            bb_opcode = list()
            for head in Heads(block.startEA, block.endEA):
                if isCode(GetFlags(head)):  # opcode
                    op = '%02x'%(Byte(head))
                    bb_opcode.append(op)
            func_opcode.append(bb_opcode)
        ops_list.append(func_opcode)


if len(ops_list) != 0:
    with open(save_path, 'wb') as f:
        pickle.dump(ops_list, f, protocol=4)

idc.Exit(0)
